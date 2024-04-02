FROM node:20.5-alpine as dev-deps
#* cd app
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile

#* Fase del builder
FROM node:20.5-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# Run yarn test
RUN yarn build

FROM nginx:1.23.3 as prod
EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD [ "nginx", "-g", "daemon off;" ]