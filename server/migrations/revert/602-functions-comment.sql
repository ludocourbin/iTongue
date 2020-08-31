-- Revert itongue:602-functions-comment from pg

BEGIN;

DROP FUNCTION "get_comments"("recordId" INT, "limit" INT);
DROP TYPE "comments_with_user";

COMMIT;
