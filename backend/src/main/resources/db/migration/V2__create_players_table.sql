CREATE TABLE IF NOT EXISTS players
(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "kda" REAL,
    "position" TEXT,
    "teamId" INT,
    FOREIGN KEY ("teamId") REFERENCES teams(id)
);