VERSION=`cat package.json | jq -r '.version'`

docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_PASSWORD registry.wiklosoft.com
docker build -t registry.wiklosoft.com/iot-dash:$VERSION . --platform linux/amd64
docker push registry.wiklosoft.com/iot-dash:$VERSION