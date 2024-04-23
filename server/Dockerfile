FROM node:alpine
WORKDIR /app
COPY ./package.json .
COPY yarn.lock .
RUN yarn 
COPY . .
EXPOSE 5000
CMD ["yarn", "run", "dev"]