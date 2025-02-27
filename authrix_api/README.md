# authrix api

API сервис для взаимодействия с блокчейном NEAR в рамках децентрализованной системы авторизации authrix. Сервис обеспечивает работу с пользователями и сервисами, включая регистрацию, верификацию и управление сертификатами.

## Системные требования
- Node.js 16+
- npm 8+
- Доступ к сети NEAR Testnet
- NEAR CLI

## Установка
Установка зависимостей проекта:
```bash
npm install
```

## Запуск
Для запуска сервиса в режиме разработки:
```bash
npm run start:dev
```

Для запуска в production режиме:
```bash
npm run build
npm run start:prod
```

## Docker

Поместите `.near-credentials` в `C:/users/User`

```bash
docker-compose up --build -d
```

## API Методы

### Пользователи (User Controller)

1. Получение публичного ключа пользователя
```http
GET /user/publicKey?username={username}
```

2. Получение имени пользователя по мнемонической фразе
```http
GET /user/username?mnemonicHash={mnemonicHash}
```

3. Создание пользователя
```http
POST /user/create
```
Тело запроса:
```json
{
  "username": "user123",
  "publicKeyHash": "hash...",
  "mnemonicHash": "hash...",
  "isChange": false
}
```

4. Верификация пользователя
```http
POST /user/verify
```
Тело запроса:
```json
{
  "username": "user123",
  "publicKeyHash": "hash..."
}
```

### Сервисы (Service Controller)

1. Получение информации о сертификате по домену
```http
GET /service/certificate?domain={domain}
```

2. Получение информации о сертификате по номеру
```http
GET /service/certificate/number?certNumber={certNumber}
```

3. Регистрация сервиса
```http
POST /service/register
```
Тело запроса:
```json
{
  "domain": "example.com",
  "name": "My Service"
}
```

## Swagger
Документация API доступна по адресу:
```
http://localhost:3000/api
```

## Лицензия
MIT
