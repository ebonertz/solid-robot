# Microservice Devgurus template #

Template for microservices using the following technologies:
* NodeJS
* ES6
* BabelJS
* Jasmine
* ESLint
* Gulp
* Docker
* Iron.io

## Build ##

The template is based on ES6, so in order to run in environments that no fully support ES6 we need Babel to compile the code from ES6 to ES5.
The destination path is the /app folder

Run:

```gulp build```

## Run ##
Run for the first time:

```npm install -g gulp```

```npm install```

After installing the dependencies for running with development config:

```gulp```

For running with prod config:

```gulp run_production```

## Test ##
Run

```npm test```

## Check for JS code quality ##
Run:

```gulp lint```
