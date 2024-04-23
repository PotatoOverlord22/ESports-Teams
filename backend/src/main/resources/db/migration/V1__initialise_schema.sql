CREATE TABLE IF NOT EXISTS "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo_url" varchar(1024),
    "region" TEXT NOT NULL
);