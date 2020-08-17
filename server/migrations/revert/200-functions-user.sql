-- Revert itongue:200-functions-user from pg

BEGIN;

DROP VIEW "users", "records", "users_languages";

DROP FUNCTION "get_similar_slugs", "insert_user";

COMMIT;
