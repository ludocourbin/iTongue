-- Deploy itongue:201-views-expressions to pg

BEGIN;

CREATE TYPE "expression_translation" AS ("id" INT, "text" TEXT, "createdAt" TIMESTAMPTZ, "language" JSON);

CREATE VIEW "expression_with_relations" AS
     SELECT "e"."id", "e"."label", "e"."created_at" AS "createdAt", COALESCE(json_agg(("t"."id", "t"."text", "t"."created_at", "t"."language")::"expression_translation") FILTER(WHERE "t"."id" IS NOT NULL), '[]') AS "translations"
       FROM "expression" "e"
  LEFT JOIN "translation_with_relations" "t"
         ON "e"."id" = "t"."expression_id"
   GROUP BY "e"."id"
   ORDER BY "e"."id" DESC;

COMMIT;
