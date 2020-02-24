FROM nginx:1.13
MAINTAINER Jaime Rojas <jaimitorojas@gmail.com>
RUN apt-get update && apt-get install -y curl && apt-get clean

COPY dist/filtering-matches-fe /usr/share/nginx/html
