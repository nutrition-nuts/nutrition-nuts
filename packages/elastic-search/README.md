# ElasticSearch Docker Container

## setup
1. Make sure you have [Docker](https://www.docker.com/) installed and running
2. run `docker-compose up -d ` within this directory
3. Wait a few seconds 
4. Run `curl http://localhost:9200` to verify the container is up and running

## details
right now, we just have a single-node elasticsearch container without any authentication. Of course, if we were to deploy this, we would 
add some authentication and security. But I don't think we should have to worry about that now.