# 1. Base image
FROM node:20-alpine AS base

# 2. Build aşaması
FROM base AS builder
WORKDIR /app

# package.json ve package-lock.json kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm kaynak dosyaları kopyala
COPY . .

# Build sırasında production env dosyasını kullan
COPY .env.production .env

# Next.js build
RUN npm run build

# 3. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Gerekli dosyaları kopyala
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./ 
COPY --from=builder /app/.env.production ./.env

# Portu expose et
EXPOSE 8086

# Start komutu
CMD ["npm", "run", "start", "--", "-p", "8086"]
