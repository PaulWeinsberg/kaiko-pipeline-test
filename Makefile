UIDGID          = $(shell id -u):$(shell id -g)
NODE_VERSION    = 22-alpine
BUILDDIR       ?= .
WORKDIR         = /app
VERSION        ?= HEAD
IMAGE          ?= gcr.io/kaiko-gcr/spininteractive-institutionalwebsite:$(VERSION)
DOCKER_RELEASE ?= Dockerfile.release
DOCKER ?= docker run \
		--interactive \
		--tty \
		--rm \
		-e"API_KEY" \
		-e"API_URL" \
		-e"GTM_DEBUG" \
		-e"GTM_ENABLE" \
		-e"HOME=$(WORKDIR)" \
		-e"NODE_ENV" \
		-e"SSR_HOST" \
		-e"SSR_PROTOCOL" \
		-e"STATIC_HOST" \
		-e"STATIC_PROTOCOL" \
		-e"WP_URL" \
		--user="$(UIDGID)" \
		--volume="$(shell pwd):$(WORKDIR)" \
		--workdir="$(WORKDIR)" \
		--publish="3000:3000" \
		node:${NODE_VERSION}

.PHONY: build start release clean install

# Install the application
install:
	$(DOCKER) npm install

# Build the Docker image
build: install
	$(DOCKER) npm run ssr:build

# Start the application
start:
	$(DOCKER) npm run ssr:serve

# Release the application
release: build
	docker build --tag="$(IMAGE)" $(BUILDDIR) --file="$(DOCKER_RELEASE)"

# Clean up Docker images and containers
clean:
	docker rm $(DOCKER_CONTAINER_NAME) || true
	docker image prune -f
