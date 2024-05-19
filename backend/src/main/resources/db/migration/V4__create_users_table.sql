CREATE TABLE IF NOT EXISTS users
(
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL unique,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);