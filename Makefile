install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage

test:
	npx -n --experimental-vm-modules jest

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack

del_build:
	rm -rf dist