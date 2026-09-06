## Running the app in local

1. Setup `.env.dev` based on `.env.example`.

2. Run the below commands :
    ```bash
    docker compose --env-file .env.dev up -d

    bun run db:generate

    bun --env-file=.env.dev run db:migrate

    bun --env-file=.env.dev run db:seed
    ```

## Stopping the app in local

1. Run the below command :

    ```bash
    docker compose --env-file .env.dev down
    # or
    docker compose --env-file .env.dev down -v
    ```


## Steps to run:

### Dev:

1. Create .env.dev file from .env_sample in the project root directory and populate values.

2. Run `docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file=.env.docker.dev up -d`

3. bun --env-file=.env.dev run dev

### Prod:

1. Create `/data/n8n_data` and `/data/postgres_data` directories (if not present) for docker volumes.

2. Run `sudo chown -R ubuntu:ubuntu /data` and Run `sudo chown -R 1000 /data/n8n_data`.

3. Create .env file from .env_sample in the project root directory and populate values.

4. Create certs directory in the project root directory and add certificate files.

5. Create n8n.conf file from n8n.conf_sample inside nginx/conf.d directory and populate values.

6. Pull docker images.

7. Run `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`