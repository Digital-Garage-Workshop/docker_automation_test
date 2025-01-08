FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN npm install --legacy-peer-deps

COPY . .

FROM base AS build

RUN npm run build

FROM node:18-alpine AS production

ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]
