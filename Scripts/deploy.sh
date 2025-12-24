#!/bin/bash

docker pull <AWS_ECR_URL>/student-app:latest

docker stop student-app || true
docker rm student-app || true

docker run -d \
--name student-app \
-p 80:5000 \
<AWS_ECR_URL>/student-app:latest
