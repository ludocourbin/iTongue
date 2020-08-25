-- Deploy itongue:400-view-landingpage to pg

BEGIN;

CREATE OR REPLACE FUNCTION "users_with_more_records"("limit" INT)
RETURNS TABLE("userId" INT,"slug" TEXT, "firstname" TEXT, "lastname" TEXT, "avatarUrl" TEXT, "iRecords" BIGINT)
AS $$

BEGIN

    RETURN QUERY
    SELECT DISTINCT "r"."user_id" AS "userId", 
                    "u"."slug",
                    "u"."firstname",
                    "u"."lastname",
                    "u"."avatar_url",
                    count(*) AS "iRecords"
              FROM "record" "r"
              JOIN "user" "u" ON "u"."id" = "r"."user_id"
          GROUP BY "r"."user_id", 
                    "u"."slug",
                    "u"."firstname",
                    "u"."lastname",
                    "u"."avatar_url"
          ORDER BY "iRecords" DESC
             LIMIT $1;

END

$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION "translations_with_more_records"("limit" INT)
RETURNS TABLE("translationId" INT, "text" TEXT, "language" TEXT, "expression" TEXT, "expressionId" INT, "iRecords" BIGINT)
AS $$

BEGIN

  RETURN QUERY
  SELECT DISTINCT "r"."translation_id" AS "translationId",
                  "t"."text" AS "text",
                  "l"."code" AS "language",
                  "e"."label" AS "expression",
                  "e"."id" AS "expressionId",
                  count(*) AS "iRecords"
            FROM "record" "r"
            JOIN "translation" "t" ON "t"."id" = "r"."translation_id"
            JOIN "expression" "e" ON "t"."expression_id" = "e"."id"
            JOIN "language" "l" ON "t"."language_id" = "l"."id"
        GROUP BY "translationId",
                  "t"."text",
                  "e"."label",
                  "e"."id",
                  "l"."code"
        ORDER BY "iRecords" DESC
           LIMIT $1;

END

$$ LANGUAGE plpgsql STABLE;


COMMIT;
