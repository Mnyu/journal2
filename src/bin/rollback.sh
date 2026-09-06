#!/bin/bash

set -e

IMAGE="$1"

docker pull "$IMAGE"

export IMAGE

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d