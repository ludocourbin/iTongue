-- Deploy itongue:500-tables-follow-userLike to pg

BEGIN;

CREATE TABLE "user_user_follow" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "follower_id" INTEGER REFERENCES "user"("id") NOT NULL,
  "followed_id" INTEGER REFERENCES "user"("id") NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

ALTER TABLE "user_user_follow"
ADD CONSTRAINT "unique_follow" UNIQUE ("follower_id", "followed_id");

CREATE TABLE "liked_record" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
  "record_id" INTEGER REFERENCES "record"("id") NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

COMMIT;
