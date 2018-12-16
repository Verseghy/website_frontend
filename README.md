# VFGHonlap2frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Docker usage
Run this docker command to install all of the dependencies
```
docker run --rm -w=/home/node -v $(pwd):/home/node node:8 npm i --no-progress
```

Run this docker command to build the docker containers
```
docker-compose build
```

Run this docker command to start up the docker containers
```
docker-compose up
```

Run this docker command to destroy the whole network of containers
```
docker-compose down
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
