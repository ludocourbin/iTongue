-- Revert itongue:400-view-landingpage from pg

BEGIN;

DROP FUNCTION "users_with_more_records"("limit" INT);
DROP FUNCTION "translations_with_more_records"("limit" INT);

COMMIT;