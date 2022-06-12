# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn install && yarn prisma generate && yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
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

#debug pp
RUN apk update && apk add bash

#USER nestjs

EXPOSE 3100

ARG D_URL 
ARG C_SECRET
ARG S_API_KEY

ENV PORT 3100
ENV DATABASE_URL ${D_URL}
ENV CRYPTO_SECRET ${C_SECRET}
ENV SENDGRID_API_KEY ${S_API_KEY}
ENV CLIENT_BASE_URL https://a-comosus.com


CMD ["node", "dist/main"]