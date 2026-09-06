#!/bin/bash

set -euo pipefail

APP_IMAGE="$1"
MIGRATE_IMAGE="$2"

echo "Deploying..."

docker pull "$APP_IMAGE"

docker pull "$MIGRATE_IMAGE"

export APP_IMAGE

export MIGRATE_IMAGE

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

sleep 10

# curl -fs http://localhost:3000/api/v1/health/live

echo "Deployment successful"