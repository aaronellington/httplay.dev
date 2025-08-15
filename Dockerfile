FROM node:24-alpine AS frontend_builder
RUN apk add --no-cache git
WORKDIR /workspace
COPY . .
RUN git clean -Xdff
RUN npm install
RUN npm run build

FROM ghcr.io/lunagic/poseidon:latest
COPY --from=frontend_builder /workspace/dist /workspace/
