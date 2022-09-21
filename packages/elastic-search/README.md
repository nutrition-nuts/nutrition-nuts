# ElasticSearch Docker Container

## setup

### Docker Container

1. Make sure you have [Docker](https://www.docker.com/) installed and running
2. Run `docker-compose up -d ` within this directory
3. Wait a few seconds
4. Run `curl http://localhost:9200` to verify the container is up and running

### Data

1. Make sure you have python3 installed
2. Run `python3 -m pip install -r requirements.txt`
3. Run `python3 index_elastic_search.py`

## details

right now, we just have a single-node elasticsearch container without any authentication. Of course, if we were to deploy this, we would
add some authentication and security. But I don't think we should have to worry about that now.

the data is all in the form of json documents within the `data/` directory. Each subdirectory is an index in the cluster
