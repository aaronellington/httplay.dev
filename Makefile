.PHONY: full clean lint fix test build build-npm dev-npm watch docker-build docker-test

SHELL=/bin/bash -o pipefail
$(shell git config core.hooksPath ops/git-hooks)

full: clean lint test build

## Clean the project of temporary files
clean:
	git clean -Xdff --exclude="!.env.local" --exclude="!.env.*.local"

## Lint the project
lint:

## Fix the project
fix:

## Test the project
test:

## Build the project
build: build-npm

build-npm:
	npm install
	npm run build

dev-npm: build-npm

## Watch the project
watch:

docker-build:
	docker build -t 'aaronellington/httplay.dev:latest' .

docker-test: docker-build
	docker run --rm -it -p 3000:3000/tcp aaronellington/httplay.dev:latest
