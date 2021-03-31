#!/bin/sh
down_cmd="docker-compose -f ${DOCKER_FILE}/docker-compose.yaml down"

$down_cmd