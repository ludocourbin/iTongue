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
  SELECT  "l"."id", "l"."name", "l"."code", "lu"."role", "lu"."user_id" AS "userId"
    FROM "language_user" "lu"
    JOIN "language" "l"
      ON "lu"."language_id" = "l"."id";


CREATE VIEW "expression_display" AS
     SELECT "id", "label", "created_at" AS "createdAt"
       FROM "expression";


CREATE VIEW "translation_display" AS
     SELECT "t"."id", "t"."text","t"."created_at" AS "createdAt", to_json("e".*) AS "expression", to_json("l".*) AS "language"
       FROM "translation" "t"
  LEFT JOIN "expression_display" "e"
         ON "t"."expression_id" = "e"."id"
  LEFT JOIN "language" "l"
         ON "t"."language_id" = "l"."id";


CREATE VIEW "records" AS
   SELECT "r"."id", "r"."url", "r"."user_id" AS "userId", to_json("t".*) AS "translation", "r"."created_at" AS "createdAt"
     FROM "record" "r"
LEFT JOIN "translation_display" "t"
       ON "r"."translation_id" = "t"."id";


CREATE VIEW "user_with_relations" AS
   SELECT "u".*,
         COALESCE(json_agg("r".*) FILTER(WHERE "r"."id" IS NOT NULL), '[]') AS "records",
         COALESCE(json_agg("l".*) FILTER(WHERE "l"."id" IS NOT NULL), '[]') AS "languages"
     FROM "user" "u"
LEFT JOIN "records" "r"
       ON "u"."id" = "r"."userId"
LEFT JOIN "users_languages" "l"
       ON "u"."id" = "l"."userId"
 GROUP BY "u"."id";


CREATE VIEW "user_display" AS
     SELECT "id", "email", "firstname", "lastname", "slug", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "languages"
       FROM "user_with_relations";


COMMIT;
