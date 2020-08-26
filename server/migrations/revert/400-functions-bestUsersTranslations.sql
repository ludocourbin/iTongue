-- Revert itongue:400-view-landingpage from pg

BEGIN;

DROP FUNCTION "users_with_more_irecords"("limit" INT);
DROP FUNCTION "translations_with_more_irecords"("limit" INT);
DROP FUNCTION "last_irecords"("limit" INT);
DROP FUNCTION "iteacher_preferred_language"("user_id" INT);

DROP TYPE "best_users", "best_translations", "most_used_language_by_user";

COMMIT;