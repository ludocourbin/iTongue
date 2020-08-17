-- Deploy itongue:200-functions-user to pg

BEGIN;

CREATE FUNCTION "insert_user" ("new_user" JSON)
RETURNS INT AS $$

  INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug")
       SELECT "email", "password", "firstname", "lastname", "slug"
         FROM json_populate_record(NULL::"user", "new_user")
       RETURNING "id";

$$ LANGUAGE SQL VOLATILE;


CREATE FUNCTION "get_similar_slugs" ("slg" TEXT)
RETURNS SETOF TEXT AS $$

  SELECT "slug" FROM "user" WHERE "slug" LIKE "slg" || '%' ORDER BY "id" DESC;

$$ LANGUAGE SQL STABLE;


CREATE VIEW "users_languages" AS
  SELECT  "l"."id", "l"."name", "l"."code", "lu"."role", "lu"."user_id"
    FROM "language_user" "lu"
    JOIN "language" "l"
      ON "lu"."language_id" = "l"."id";


CREATE VIEW "records" AS
   SELECT "r"."id", "r"."url", "r"."user_id", row_to_json("t".*) AS "translation", "r"."created_at"
     FROM "record" "r"
LEFT JOIN "translation" "t"
       ON "r"."translation_id" = "t"."id";


CREATE VIEW "users" AS
   SELECT "u"."id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."bio", "u"."avatar_url", "u"."created_at",
         COALESCE(json_agg("r".*) FILTER(WHERE "r"."id" IS NOT NULL), '[]') AS "records",
         COALESCE(json_agg("l".*) FILTER(WHERE "l"."id" IS NOT NULL), '[]') AS "languages"
     FROM "user" "u"
LEFT JOIN "records" "r"
       ON "u"."id" = "r"."user_id"
LEFT JOIN "users_languages" "l"
       ON "u"."id" = "l"."user_id"
 GROUP BY "u"."id";


COMMIT;
