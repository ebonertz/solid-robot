FROM iron/node:4

WORKDIR /app
ADD src /app/src
ADD config /app/config
ADD package.json /app/package.json
ADD gulpfile.babel.js /app/gulpfile.babel.js
ADD .babelrc /app/.babelrc
ADD .eslintrc /app/.eslintrc
ADD .eslintignore /app/.eslintignore
ADD README.md /app/README.MD

RUN npm install -g gulp
RUN npm install
RUN gulp build

ENTRYPOINT ["node", "app/index.js"]
