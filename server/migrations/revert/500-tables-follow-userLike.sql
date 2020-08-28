-- Revert itongue:500-tables-follow-userLike from pg

BEGIN;

DROP TABLE "user_user_follow", "liked_record";

COMMIT;
