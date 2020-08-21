/* UPDATE "user" SET "is_admin" = true WHERE id = 5; */


/* Add User */
INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug", "bio", "avatar_url", "is_admin")
VALUES ('zou8@zou.zou', 'zouzou', 'zou', 'zou', 'zou-zou8', 'bio', 'https://randomuser.me/api/portraits/men/33.jpg', 'false');

/* Add avatar and bio to user ID */
UPDATE "user"
SET "bio" = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum suscipit illo velit ✈️'
, "avatar_url" = 'https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512'
WHERE "id" = 5;

UPDATE "user"
SET "avatar_url" = ''
WHERE "id" = 5;

/* Add record */ 
INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', 
'5', 
'1');

INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', 
'5', 
'2');

INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', '9', '5'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', '9', '6'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', '9', '7'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', '9', '8');


/* languages */
INSERT INTO "language" ("name", "code")
     VALUES ('Français', 'fr'),
            ('English', 'uk'),
            ('Espagnol', 'es'),
            ('Portuguais', 'pt');

/*add language to user ( teacher || learner ) */

INSERT INTO "language_user" ("language_id", "user_id", "role")
     VALUES ('1', '5', 'teacher'),
     ('2', '5', 'teacher'),
     ('3', '5', 'learner'),
     ('4', '5', 'learner');

   /*         
Pour le back :

GET /records :

id
slug
avatarUrl
firstname
lastname

Créer une route qui retourne des stats pour le dashboard genre: (au lieu de faire 4 requests)
Nombre d'utilisateur total
Nombre d'iRecords total
Nombre de traductions total
Nombre de langues total

*/