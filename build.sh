#!/bin/sh

installAngular() {
  ANGULAR_CLI=`npm ls -j @angular/cli`
  if [ "$ANGULAR_CLI" = "{}" ]; then
    echo "Install AngularCLI"
    echo "no" | npm install --silent @angular/cli
  fi
}

buildApp() {
  echo "Build app"
  npm install && ng build
  echo "Build docker image"
  docker build -t filtering-matches-web .
}

deleteDistDir() {
  DEST_FOLDER="dist/"
  if [ -d "$DEST_FOLDER" ]; then
    echo "Delete '${DEST_FOLDER}' folder"
    rm -R $DEST_FOLDER
  fi
}

startContainer() {
  DOCKER_IMAGES=`docker images -q -f 'reference=filtering-matches-web*'`
  if [ "$DOCKER_IMAGES" = "" ]; then
    buildApp
  fi
  echo "Start containers"
  docker-compose up -d
}

stopContainer() {
  RUNNING_CONTAINERS=`docker-compose ps -q`
  if [ "$RUNNING_CONTAINERS" != "" ]; then
    echo "Stop containers"
    docker-compose down
  fi
}

deleteContainerImages() {
  DOCKER_IMAGES=`docker images -q -f 'reference=filtering-matches-web*'`
  if [ "$DOCKER_IMAGES" != "" ]; then
    echo "Delete container images"
    docker rmi $(docker images -q -f 'reference=filtering-matches-web*')
  fi
}

if [ "$1" = "stop" ]; then
  stopContainer
  exit 0
fi

if [ "$1" = "clean" ]; then
  deleteDistDir
  deleteContainerImages
  exit 0
fi

if [ "$1" = "start" ]; then
  startContainer
  exit 0
fi

if [ "$1" = "test" ]; then
  ng test
  exit 0
fi

if [ "$1" = "e2e" ]; then
  ng e2e
  exit 0
fi

installAngular
buildApp
