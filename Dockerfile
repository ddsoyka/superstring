FROM node:15.3.0 AS builder
WORKDIR /superstring
COPY package.json package-lock.json /superstring/
RUN npm install
COPY tsconfig.json /superstring/
COPY public /superstring/public
COPY src /superstring/src
RUN npm run build

FROM nginx:1.19.5
COPY --from=builder /superstring/build /usr/share/nginx/html
