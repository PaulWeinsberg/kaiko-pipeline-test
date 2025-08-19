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
		-e"HOME=$(WORKDIR)" \
		-e"NODE_ENV" \
		-e"BASE_URL" \
		-e"WP_URL" \
		-e"API_URL" \
		-e"API_KEY" \
		--user="$(UIDGID)" \
		--volume="$(shell pwd):$(WORKDIR)" \
		--workdir="$(WORKDIR)" \
		--publish="3000:3000" \
		node:${NODE_VERSION}

.PHONY: build start release clean install

# Install the application
install:
	$(DOCKER) yarn install

# Build the Docker image
build: install
	$(DOCKER) yarn build

# Start the application
start:
	$(DOCKER) yarn start

# Release the application
release: build
	docker build --tag="$(IMAGE)" $(BUILDDIR) --file="$(DOCKER_RELEASE)"

# Clean up Docker images and containers
clean:
	docker rm $(DOCKER_CONTAINER_NAME) || true
	docker image prune -f
