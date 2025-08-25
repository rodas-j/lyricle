FROM oven/bun:1-alpine AS node_modules
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .

FROM node_modules AS prod_builder
RUN bun run build

## Production image
FROM nginx:1.20.2-alpine AS prod
COPY docker/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=prod_builder /app/dist /usr/share/nginx/html
COPY docker/build_system.sh .
RUN ./build_system.sh && rm ./build_system.sh
# port use by Nginx within docker network.
EXPOSE 8080
USER reactle

## Development image
FROM node_modules AS dev
EXPOSE 3000
CMD bun run dev
