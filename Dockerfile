FROM node:15.11.0-alpine3.13 AS builder
RUN apk update && apk add git
WORKDIR /superstring
COPY . .
RUN npm install && npm run build

FROM nginx:1.19.5
COPY --from=builder /superstring/build /usr/share/nginx/html
