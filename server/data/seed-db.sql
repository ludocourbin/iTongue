BEGIN;

TRUNCATE "record", "language_user", "translation", "expression", "language", "user" RESTART IDENTITY;

INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug")
     VALUES ('zou@zou.zou', 'zouzou', 'zou', 'zou', 'zou-zou'),
            ('blou@blou.blou', 'bloublou', 'blou', 'blou', 'blou-blou'),
            ('flou@flou.flou', 'flouflou', 'flou', 'flou', 'flou-flou');

INSERT INTO "language" ("name", "code")
     VALUES ('français', 'fr'),
            ('english', 'en');

INSERT INTO "expression" ("label")
     VALUES ('salut'),
            ('au revoir');

INSERT INTO "translation" ("text", "expression_id", "language_id")
     VALUES ('bonjour à toi', 1, 1),
            ('good bye', 2, 2);

INSERT INTO "language_user" ("language_id", "user_id", "role")
     VALUES (1, 1, 'learner'),
            (1, 2, 'teacher');

INSERT INTO "record" ("url", "user_id", "translation_id")
     VALUES ('zou.mp3', 1, 1),
            ('blou.wav', 2, 2);

COMMIT;