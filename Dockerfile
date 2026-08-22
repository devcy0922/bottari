FROM node:22-alpine
RUN corepack enable
WORKDIR /app
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm db:generate && pnpm build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm","start"]
