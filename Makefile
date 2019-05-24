export HOST_USER_ID=$(shell id -u)
RUN_IN_BUILD_CONTAINER=docker-compose -f docker/docker-compose.yml run --rm --service-ports -e HOST_USER_ID=$(HOST_USER_ID) gulpflow

default: serve

install:
	$(RUN_IN_BUILD_CONTAINER) bash -c "yarn"

serve:
	$(RUN_IN_BUILD_CONTAINER) bash -c "gulp"

tap:
	$(RUN_IN_BUILD_CONTAINER) bash
