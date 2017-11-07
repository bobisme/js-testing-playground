default: help

TEST_FILES ?= 'test/**/*.spec.js'
MOCHA_OPTS := \
	--require babel-register \
	--require babel-polyfill \
	--require test/setup-jsdom \
	--require test/setup-enzyme

.PHONY: test-jsdom
test-jsdom: ## Run Node/JSDOM tests
	@echo "Running node/jsdom tests"
	mocha $(MOCHA_OPTS) $(TEST_FILES)
	@echo

test: test-jsdom ## Run unit tests

test-jsdom-watch: ## Run Node/JSDOM tests and watch for changes
	mocha --watch $(MOCHA_OPTS) $(TEST_FILES)

.PHONY: test-karma
test-karma: ## Run tests via karma
	@echo "Running karma tests"
	karma start --single-run --browsers ChromeHeadless karma.conf.js
	@echo

.PHONY: test-nightwatch
test-nightwatch:
	@echo "Running acceptance tests with nightwatch"
	nightwatch
	@echo

test-cucumber: test-nightwatch
test-acceptance: test-nightwatch ## Run acceptance tests.

test-all: test-jsdom test-karma test-nightwatch ## Run ALL tests

.PHONY: start-dev-server
start-dev-server:
	env NODE_ENV=dev webpack-dev-server

start: start-dev-server

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
