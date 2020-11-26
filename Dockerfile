FROM node:15.3.0 AS builder
WORKDIR /superstring
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.19.5
COPY --from=builder /superstring/build /usr/share/nginx/html
