FROM ubuntu:latest

LABEL maintainer="Nick Ciolpan <nick@graffino.ro>"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get -y upgrade \
    && apt-get install -y software-properties-common \
    build-essential \
    nodejs npm \
    curl \
    git php-cli php-mbstring php-xml git unzip libnotify-bin

RUN npm install -g babel-cli backstopjs bower \
    browser-sync critical eslint gulp-cli \
    htmlhint lighthouse npm-check-updates \
    nunjucks phantomjs phplint slimerjs \
    stylint stylint-json-reporter stylus \
    ttf2woff xo n yarn

RUN n 9.11.2

WORKDIR /tmp

RUN git clone -b master https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git wpcs
RUN curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar && \
    cp /tmp/phpcs.phar /usr/local/bin/phpcs && \
    chmod +x /usr/local/bin/phpcs

RUN phpcs --config-set installed_paths wpcs
