VERSION=`cat package.json | jq -r '.version'`

npm install
npm run build
docker build -t registry.wiklosoft.com/iot-dash:$VERSION . --platform linux/amd64
docker push registry.wiklosoft.com/iot-dash:$VERSION