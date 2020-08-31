-- Deploy itongue:602-functions-comment to pg

BEGIN;

CREATE TYPE "comments_with_user" AS ("id" INT, "text" TEXT, "user" JSON, "createdAt" TIMESTAMPTZ);

CREATE FUNCTION "get_comments"("recordId" INT, "limit" INT)
RETURNS setof "comments_with_user"
AS $$

BEGIN

  RETURN QUERY
  SELECT "r"."id", "r"."text",
         json_build_object(
           'id', "u"."id", 
           'firstname', "u"."firstname", 
           'lastname', "u"."lastname", 
           'slug', "u"."slug", 
           'avatarUrl', "u"."avatar_url") AS "user",
         "r"."created_at" AS "createdAt"
            FROM "record_comment" "r" 
            JOIN "user" "u" ON "u"."id" = "r"."user_id"
          WHERE "record_id" = $1
        ORDER BY "r"."created_at" DESC
           LIMIT $2;

END

$$ LANGUAGE plpgsql STABLE;

COMMIT;
