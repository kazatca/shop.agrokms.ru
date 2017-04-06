run:
	@node -r babel-core/register -r dotenv/config src/index.js

build:
	@rollup -c

run-prod:
	@node -r dotenv/config dist/bundle.js

test: 
	@../node_modules/mocha/bin/mocha

.PHONY: test
