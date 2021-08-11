SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules


first: help


build: npm-build  ## Build site

# ------------------------------------------------------------------------------
# Build (JS)

npm-build:  ## Build website
	cd $(CURDIR)/jsnpm run build
	cd $(CURDIR)jsnpm run export


npm-i: npm-install
npm-install:  ## Install JS dependencies
	cd $(CURDIR)jsnpm install


npm-dev:  ## Run dev server
	cd $(CURDIR)jsnpm run dev


cleanjs:  ## Clean JS files
	rm -rf $(CURDIR)js/out
	rm -rf $(CURDIR)js/.next


cleanalljs: cleanjs  ## Clean JS files
	rm -rf $(CURDIR)js/node_modules
	rm -rf $(CURDIR)js/package-lock.json


# ------------------------------------------------------------------------------
# Other

clean: cleanjs  ## Clean build files


cleanall: cleanalljs  ## Clean everything


help:  ## Show this help menu
	@grep -E '^[0-9a-zA-Z_-]+:.*?##.*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?##"; OFS="\t\t"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, ($$2==""?"":$$2)}'
