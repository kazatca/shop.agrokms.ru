test:
	@mocha

int-test: 
	@mocha --opts ./int-test/mocha.opts

dev:
	@webpack-dev-server -d

prod:
	@webpack -p --config webpack.config.prod.js --progress

.PHONY:	test int-test
