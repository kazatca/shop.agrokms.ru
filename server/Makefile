run:
	@node -r babel-core/register -r dotenv/config src/index.js

build:
	@webpak --progress

run-prod:
	@node -r dotenv/config dist/bundle.js

test: 
	@../node_modules/mocha/bin/mocha

.PHONY: test
