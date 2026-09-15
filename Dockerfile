FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine
RUN apk add --no-cache nginx dumb-init
WORKDIR /app
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY server/ ./server/
RUN chmod +x /app/server/start.sh
COPY --from=build /app/out/ /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:8080/healthz >/dev/null || exit 1
CMD ["dumb-init", "--", "/app/server/start.sh"]
