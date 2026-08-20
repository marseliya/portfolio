FROM node:22-alpine

WORKDIR /app

ENV CI=true

RUN npm install -g pnpm

RUN pnpm config set fetch-timeout 120000

COPY be/package.json be/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY be/ .

EXPOSE 3000

CMD ["node", "server.js"]