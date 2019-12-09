FROM node:lastet
RUN mkdir /app
COPY . /app/
WORKDIR /app/
RUN yarn install
CMD ["node", "."]