# CRM System Monorepo

![Static Badge](https://img.shields.io/badge/PostgresSQL-17.4-blue)
![Static Badge](https://img.shields.io/badge/Node_Js-20.18.0-red)
![Static Badge](https://img.shields.io/badge/npm-10.8.2-yellow)
![Static Badge](https://img.shields.io/badge/MinimalUI-7.0.0-green)
![Static Badge](https://img.shields.io/badge/Nginx-1.27.5-green)


**Проектная структура:**  
Monorepository с микросервисной архитектурой:
- **frontend** (React + Vite)
- **auth-service** (Node.js + Express)
- **tasks-service** (Node.js + Express)
- **gateway** (Nginx)
- **db** (PostgreSQL)

---

## 📦 Технологии

- **Frontend**: React, Vite, Axios
- **Backend Auth Service**: Node.js, Express, JWT, Cloudinary
- **Backend Tasks Service**: Node.js, Express, JWT, Cloudinary
- **API Gateway**: Nginx
- **Database**: PostgreSQL
- **Docker** + **Docker Compose** для контейнеризации

---

## 🚀 Быстрый старт

1. **Клонировать репозиторий**
   ```bash
   git clone https://github.com/your-username/crm-system.git
   cd crm-system
   ```

2. **Создать файл `env.js` для frontend**

   В папке `frontend/public/` создать файл `env.js`:

   ```javascript
   window.env = {
     API_URL: "http://localhost"
   };
   ```

   > Это позволяет фронтенду динамически знать адрес API при запуске.

3. **Запустить проект**
   
   Выполнить:
   ```bash
   docker-compose up --build
   ```

   Контейнеры:
   - Frontend: `http://localhost`
   - Backend Auth-Service через Gateway
   - База данных PostgreSQL: `localhost:5432`

---

## ⚙️ Структура docker-compose

| Сервис            | Описание                              |
| ----------------- | ------------------------------------- |
| **gateway**       | Проксирование запросов через Nginx    |
| **frontend**      | React-приложение                      |
| **auth-service**  | Node.js сервер с авторизацией         |
| **tasks-service** | Node.js сервер для работы с задачами  |
| **db**            | База данных PostgreSQL                |

---

## 🌐 Работа приложения

1. Браузер отправляет запросы на `gateway (Nginx)` через `localhost:80`.
2. Nginx направляет:
   - `/auth/*` → `auth-service`
   - `/tasks/*` || `/state/*` || `/priority/*` → `tasks-service`
3. Frontend использует `window.env.API_URL` для отправки запросов.
4. Auth-service обрабатывает авторизацию, токены, работу с базой.

---

## 🔥 Важные моменты

- **Runtime env** через `env.js`, а не через стандартные Docker ENV.
- **CORS** включен в `auth-service`, чтобы фронт и бекенд могли общаться.
- **Nginx настройка** для работы React Router:
  ```nginx
  try_files $uri $uri/ /index.html;
  ```
- При проблемах с 502 — проверять доступность контейнера и порты.

---

## 📚 Примеры API запросов

| Метод | URL                          | Описание                  |
| ----- | ---------------------------- | ------------------------- |
| POST  | `/auth/login`                | Авторизация пользователя  |
| POST  | `/auth/refresh`              | Обновление токенов        |

---

## ✅ TODO (что планируется)

- [x] Добавить новые микросервисы
- [ ] Подключить HTTPS на Nginx
- [ ] Написать e2e тесты и покрытие API

---

## 👨‍💻 Автор

> Сделано с душой ❤️