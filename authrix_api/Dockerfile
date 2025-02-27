# Этап сборки
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап production
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранное приложение из этапа сборки
COPY --from=builder /app/dist ./dist

# Открываем порт 3001
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
