CREATE TABLE IF NOT EXISTS players
(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "kda" REAL,
    "position" TEXT,
    "team_id" INT,
    FOREIGN KEY ("team_id") REFERENCES teams(id)
);