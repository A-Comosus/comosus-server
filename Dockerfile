# Install dependencies only when needed
FROM node:16-bullseye-slim AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-bullseye-slim AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn install && yarn prisma generate && yarn build

# Production image, copy all the files and run next
FROM node:16-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV production

#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nestjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/dist ./dist
#RUN chown=nestjs:nodejs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
# COPY --from=builder /app/.env ./.env

#USER nestjs

EXPOSE 3100

ENV PORT 3100
ENV NODE_ENV staging
ENV URL_META_AUTH_STRING gmail
ENV DATABASE_URL mongodb
ENV CRYPTO_SECRET defualt
ENV SENDGRID_API_KEY SG
ENV CLIENT_BASE_URL https
ENV NO_COLOR no_color


CMD ["node", "dist/main"]