#!/bin/sh
set -eu
node /app/server/contact-api.mjs &
api_pid=$!
trap 'kill "$api_pid" 2>/dev/null || true' EXIT INT TERM
exec nginx -g 'daemon off;'
