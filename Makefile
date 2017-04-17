deploy:
	@set -e
	git checkout deploy
	git rebase master
	git push heroku deploy:master -ff
	git checkout master

test:
	@set -e
	cd client && mocha
	cd server && mocha
