#!/bin/sh
up_cmd="docker-compose -f ${DOCKER_FILE}/docker-compose.yaml up -d"

$up_cmd