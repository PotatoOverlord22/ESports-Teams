-- Insert teams
INSERT INTO teams ("id", "name", "logo_url", "region")
VALUES
    (1, 'G2', 'https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png', 'EU'),
    (2, 'Fnatic', 'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png', 'EU'),
    (3, 'Mad Lions KOI', 'https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png', 'EU'),
    (4, 'kt Rolsters', 'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png', 'KR'),
    (5, 'Mad Lions KOI', 'https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png', 'KR'),
    (6, 'Mad Lions KOI', 'https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png', 'TR'),
    (7, 'FlyQuest', 'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png', 'NA');

-- Insert players for each team
-- Team G2 players
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('caps', 4.23, 'Mid', 1),
    ('hans sama', 3.45, 'ADC', 1),
    ('mikyx', 0.97, 'Support', 1),
    ('Yike', 2.03, 'Jungle', 1),
    ('Broken Blade', 2.97, 'Top', 1);

-- Team Fnatic players
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('Razork', 2.45, 'Jungle', 2),
    ('Oscarinin', 3.08, 'Top', 2),
    ('humanoid', 2.04, 'Mid', 2),
    ('noah', 3.40, 'ADC', 2),
    ('jun', 0.89, 'Support', 2);

-- Team Mad Lions KOI players
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('elyoya', 3.48, 'Jungle', 3),
    ('supa', 3.88, 'ADC', 3),
    ('alvaro', 0.45, 'Support', 3);

-- Team kt Rolsters players
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('PerfecT', 1.48, 'Top', 4),
    ('bdd', 4.88, 'mid', 4),
    ('Deft', 6.45, 'ADC', 4);

-- Team Mad Lions KOI players (second team with the same name)
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('elyoya', 3.48, 'Jungle', 5),
    ('supa', 3.88, 'ADC', 5),
    ('alvaro', 0.45, 'Support', 5);

-- Team Mad Lions KOI players (third team with the same name)
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('elyoya', 3.48, 'Jungle', 6),
    ('supa', 3.88, 'ADC', 6),
    ('alvaro', 0.45, 'Support', 6);

-- Team FlyQuest players
INSERT INTO players ("name", "kda", "position", "team_id")
VALUES
    ('bussio', 1.48, 'Support', 7),
    ('Inspired', 3.08, 'Jungle', 7),
    ('Jensen', 1.09, 'Mid', 7),
    ('Bwipo', 2.79, 'Top', 7),
    ('Massu', 2.34, 'ADC', 7);
