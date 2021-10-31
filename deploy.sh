export VERSION=`cat package.json | jq -r '.version'`
docker-compose up -d --build
