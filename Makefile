default: help

.PHONY: test-karma
test-karma:
	karma start --single-run --browsers ChromeHeadless karma.conf.js

.PHONY: test-nightwatch
test-nightwatch:
	scripts/run-acceptance-tests.js

test-cucumber: test-nightwatch
test-acceptance: test-nightwatch ## Run acceptance tests.

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
	@grep -E '^[^ .]+: .*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| sed 's/^[^:]*://' \
		| awk '\
			BEGIN { FS = ": .*##" };\
			{ printf "$(BLUE)%-29s$(RESET) %s\n", $$1, $$2  }'
