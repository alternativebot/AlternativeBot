FROM node:13.3.0-buster
RUN mkdir /app
RUN apt update
RUN apt install -y build-ess* pkg-config libxi-dev libglu1-mesa-dev libglew-dev
COPY . /app/
WORKDIR /app/
RUN yarn install
RUN chmod 777 /app/*
RUN chmod 777 /app
CMD ["node", "."]