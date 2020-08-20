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

CREATE TYPE "expression_display" AS ("id" INT, "label" TEXT, "createdAt" TIMESTAMPTZ);

CREATE VIEW "translation_with_relations" AS
     SELECT "t".*,
            to_json(("e"."id", "e"."label", "e"."created_at")::"expression_display") AS "expression",
            to_json("l".*) AS "language"
       FROM "translation" "t"
  LEFT JOIN "expression" "e"
         ON "t"."expression_id" = "e"."id"
  LEFT JOIN "language" "l"
         ON "t"."language_id" = "l"."id";

CREATE TYPE "record_translation" AS ("id" INT, "text" TEXT, "createdAt" TIMESTAMPTZ, "expression" JSON, "language" JSON);

CREATE VIEW "record_display" AS
   SELECT "r"."id", "r"."url", "r"."user_id" AS "userId", "r"."created_at" AS "createdAt",
          (SELECT to_json(("id", "text", "created_at", "expression", "language")::"record_translation")
             FROM "translation_with_relations"
            WHERE "language"->>'name' ILIKE 'english'
              AND "t"."expression"->>'id' = "expression"->>'id') AS "englishTranslation",
          to_json(("t"."id", "t"."text", "t"."created_at", "t"."expression", "t"."language")::"record_translation") AS "translation"
     FROM "record" "r"
LEFT JOIN "translation_with_relations" "t"
       ON "r"."translation_id" = "t"."id";

CREATE TYPE "user_record" AS ("id" INT, "url" TEXT, "createdAt" TIMESTAMPTZ, "englishTranslation" JSON, "translation" JSON);

CREATE VIEW "user_with_relations" AS
   SELECT "u".*,
         COALESCE(json_agg(("r"."id", "r"."url", "r"."createdAt", "r"."englishTranslation", "r"."translation")::"user_record") FILTER(WHERE "r"."id" IS NOT NULL), '[]') AS "records",
         COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'learner'), '[]') AS "learnedLanguages",
         COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'teacher'), '[]') AS "taughtLanguages"
     FROM "user" "u"
LEFT JOIN "record_display" "r"
       ON "u"."id" = "r"."userId"
LEFT JOIN "language_user" "lu"
       ON "u"."id" = "lu"."user_id"
LEFT JOIN "language" "l"
       ON "lu"."language_id" = "l"."id"
 GROUP BY "u"."id";

CREATE VIEW "user_display" AS
     SELECT "id", "email", "firstname", "lastname", "slug", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages"
       FROM "user_with_relations";

COMMIT;