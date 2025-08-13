FROM node:24-alpine AS frontend_builder
WORKDIR /workspace
COPY . .
RUN npm install
RUN npm run build

FROM ghcr.io/lunagic/poseidon:latest
COPY --from=frontend_builder /workspace/dist .
