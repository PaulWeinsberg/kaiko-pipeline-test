UIDGID          = $(shell id -u):$(shell id -g)
NODE_VERSION    = 18-alpine
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
		--user="$(UIDGID)" \
		--volume="$(shell pwd):$(WORKDIR)" \
		--workdir="$(WORKDIR)" \
		--publish="3000:3000" \
		node:${NODE_VERSION}

.PHONY: build start release clean install

# Build the Docker image
build:
	$(DOCKER_RUN) yarn build

# Install the application
install:
	$(DOCKER_RUN) yarn install

# Start the application
start:
	$(DOCKER_RUN) yarn start

# Release the application
release:
	docker build --tag="$(IMAGE)" $(BUILDDIR) --file="$(DOCKER_RELEASE)"

# Clean up Docker images and containers
clean:
	docker rm $(DOCKER_CONTAINER_NAME) || true
	docker image prune -f