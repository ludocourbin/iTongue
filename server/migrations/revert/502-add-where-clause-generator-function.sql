-- Revert itongue:502-add-where-clause-generator-function from pg

BEGIN;

DROP FUNCTION "show_records", "get_records", "get_expressions", "show_users", "get_users_with_relations", "get_users", "build_where_clause";

DROP TYPE "user_display", "user_with_relations", "expression_with_relations";

CREATE VIEW "expression_with_relations" AS
     SELECT "e"."id", "e"."label",
            (SELECT "text"
               FROM "translation" "t"
               JOIN "language" "l"
                 ON "t"."language_id" = "l"."id"
              WHERE "t"."expression_id" = "e"."id" AND "l"."name" ILIKE 'english') AS "englishText",
            "e"."created_at" AS "createdAt",
            COALESCE(json_agg(("tr"."id", "tr"."text", "tr"."created_at", "tr"."language")::"expression_translation") FILTER(WHERE "tr"."id" IS NOT NULL), '[]') AS "translations"
       FROM "expression" "e"
  LEFT JOIN "translation_with_relations" "tr"
         ON "e"."id" = "tr"."expression_id"
   GROUP BY "e"."id"
   ORDER BY "e"."id" DESC;

CREATE VIEW "user_with_relations" AS
SELECT "u".*,
 	     (SELECT COALESCE(json_agg(("r"."id", "r"."url", "r"."createdAt", "r"."englishTranslation", "r"."translation")::"user_record") FILTER(WHERE "r"."id" IS NOT NULL), '[]')
		     FROM "record_display" "r"
	 	     WHERE "u"."id" = ("r"."user"->>'id')::INT ) AS "records",
	     (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'learner'), '[]')
		      FROM "language_user" "lu"
		      JOIN "language" "l"
            ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "learnedLanguages",
       (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'teacher'), '[]')
		      FROM "language_user" "lu"
		      JOIN "language" "l" ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "taughtLanguages",
       (SELECT COUNT(*)
          FROM "user_user_follow"
         WHERE "followed_id" = "u"."id") AS "followerCount",
       (SELECT COUNT(*)
          FROM "user_user_follow"
         WHERE "follower_id" = "u"."id") AS "followedCount"
  FROM "user" "u";

CREATE VIEW "user_display" AS
     SELECT "id", "email", "firstname", "lastname", "bio", "slug", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages", "followerCount", "followedCount"
       FROM "user_with_relations";

COMMIT;
