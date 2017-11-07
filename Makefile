default: help

TEST_FILES ?= 'test/**/*.spec.js'
MOCHA_OPTS := \
	--require babel-register \
	--require babel-polyfill \
	--require test/setup-jsdom

.PHONY: phony
phony:

download-selenium: phony
	scripts/selenium-download.js

test-jsdom: phony ## Run Node/JSDOM tests
	@echo "Running node/jsdom tests"
	mocha $(MOCHA_OPTS) $(TEST_FILES)
	@echo

test: test-jsdom ## Run unit tests

test-jsdom-watch: ## Run Node/JSDOM tests and watch for changes
	mocha --watch $(MOCHA_OPTS) $(TEST_FILES)

test-karma: phony ## Run tests via karma
	@echo "Running karma tests"
	karma start --single-run --browsers ChromeHeadless karma.conf.js
	@echo

test-nightwatch: phony download-selenium
	@echo "Running acceptance tests with nightwatch"
	nightwatch
	@echo

test-cucumber: test-nightwatch
test-acceptance: test-nightwatch ## Run acceptance tests.

test-all: phony ## Run ALL tests in parallel
	concurrently \
		--names jsdom,accept,karma \
		--prefix-colors blue.bold,magenta.bold,green.bold \
		"make test" \
		"make test-acceptance" \
		"make test-karma"

test-all-sequential: phony ## Run ALL tests sequentially
	make test-jsdom && make test-karma && make test-nightwatch

start-dev-server: phony
	env NODE_ENV=dev webpack-dev-server

start: start-dev-server ## Start the webpack dev server

# Terminal color codes.
BLUE := $(shell tput setaf 4)
RESET := $(shell tput sgr0)
.PHONY: help
help:
	@# Find all targets with descriptions.
	@# Split by ":" and the " ##" pattern.
	@# Print just the target, in blue.
	@# Then print the next fields as the description
	@# in case the description has a few ":"s in it.
	@# | sed 's/^[^:]*://'   <-- only if including other makefiles
	@grep -E '^[^ .]+: .*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk '\
			BEGIN { FS = ": .*##" };\
			{ printf "$(BLUE)%-29s$(RESET) %s\n", $$1, $$2  }'
