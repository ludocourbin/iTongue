-- Revert itongue:200-functions-user from pg

BEGIN;

DROP VIEW "user_display", "user_with_relations", "records", "translation_display", "expression_display", "users_languages";

DROP FUNCTION "get_similar_slugs", "insert_user";

COMMIT;
