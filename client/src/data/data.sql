/* UPDATE "user" SET "is_admin" = true WHERE id = 5; */


/* Add User */
INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug", "bio", "avatar_url", "is_admin")
VALUES ('zou8@zou.zou', 'zouzou', 'zou', 'zou', 'zou-zou8', 'bio', 'https://randomuser.me/api/portraits/men/33.jpg', 'false');

/* Add avatar and bio to user ID */
UPDATE "user"
SET "bio" = '« Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum suscipit illo velit ✈️ »'
, "avatar_url" = 'https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512'
WHERE "id" = 5;

/* Add record */ 
INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', 
'5', 
'1');

INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', 
'5', 
'2');