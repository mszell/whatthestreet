
# Server Setup for WTS

## Initial Setup

This only needs to be done if the server is in mint condition.

### Install Docker-Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
```

```bash
sudo chmod +x /usr/bin/docker-compose
```

### Setup folder and file structure

```bash
wts/
├─ vhost/
│  ├─ gifgallery.whatthestreet.com_location
├─ dump/
├─ data/
│  ├─ db/
├─ docker-compose.yaml
```

### Prepare MongoDB

The `docker-compose.yaml` file is setup to mount the database volume and a volume that includes the database dump.

#### Upload database dumps

```bash
cities=( "berlin" "london" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" "barcelona" "beijing" "helsinki" "hongkong" "jakarta" "newyork" "portland" "sanfrancisco" "vienna" "chicago" "losangeles" )

for city in "${cities[@]}"
do
  scp -P 22 -r path/to/dump/${city}_coiled_2 debian@135.125.133.0:~/wts/dump/${city}_coiled_2
done

```

#### Import single database dump

```bash
docker exec -it mongo /usr/bin/mongorestore --db berlin_coiled_2 /dump/berlin_coiled_2 --verbose --numParallelCollections 1
```

or use `scripts/db_import.sh` to automate the import of all database collections.

#### Import complete database dump

```bash
docker exec -it mongo /usr/bin/mongorestore --archive=/dump/lab-whatthestreet-dump_2019-11-25.gz --gzip --verbose --numParallelCollections 1
```

__NOTE__: This will use a lot of memory

## Run What The Street

The project's infrastructure is setup in the `docker-compose.yaml` file. It consists of the Next.JS frontend app, the MongoDB instance and a NGINX web-service that provides the gif-gallery content.

__NOTE__: Make sure to update the `docker-compose.yaml` with the necessary passwords and access-tokens

### Start the project via docker-compose

```bash
docker-compose up -d
```

Optional method if you want changed something in the `yaml` file and want the changes to be applied

```bash
docker-compose up -d --force-recreate
```

### Stop the project via docker-compose

```bash
docker-compose down
```

__NOTE__: Make sure that you are in the directory (`~/wts`) in which the `docker-compose.yaml` file is located.
