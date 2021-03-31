#!/bin/sh
export PARENT_DIR
PARENT_DIR="$PWD"

source "${PARENT_DIR}/builds/tools/get_config.sh"

export CONFIG_PATH
CONFIG_PATH=${PARENT_DIR}/src/config.json

export DB_USER
DB_USER="$(echo `cat ${CONFIG_PATH}` | get_config "dbUser")"

export DB_PASSWORD
DB_PASSWORD="$(echo `cat ${CONFIG_PATH}` | get_config "dbPassword")"

echo "Let's run some tasks for docker..."
echo ""

export TASK_SECTION="${1}"
SCRIPT_FOLDER="${PARENT_DIR}/builds/tasks/${TASK_SECTION}"

if [[ ! -d "${SCRIPT_FOLDER}" ]]; then
    echo "還敢亂輸入啊！888888888"
    exit 1
fi

export DOCKER_FILE
DOCKER_FILE="${PARENT_DIR}/builds/docker"

for task in "${SCRIPT_FOLDER}"/*.sh; do
    task_name="$(basename "${task}")"
    echo "running task ${task_name} ..."
    source "${task}"
    echo ""
done

exit 1