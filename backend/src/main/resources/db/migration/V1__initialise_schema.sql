CREATE TABLE IF NOT EXISTS "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logourl" TEXT,
    "region" TEXT NOT NULL
);