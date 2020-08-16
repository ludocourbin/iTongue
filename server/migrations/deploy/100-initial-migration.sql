-- Deploy itongue:100-initial-migration to pg

BEGIN;

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  -- register rapide possible avec seulement email et password
  "firstname" TEXT NULL,
  "lastname" TEXT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "bio" TEXT NULL,
  "avatar_url" TEXT UNIQUE,
  "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "language" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "code" TEXT UNIQUE NOT NULL
);

CREATE TABLE "expression" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT UNIQUE NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "translation" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "text" TEXT NOT NULL,
  "expression_id" INT NOT NULL REFERENCES "expression"("id"),
  "language_id" INT NOT NULL REFERENCES "language"("id"),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE "record" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "url" TEXT UNIQUE NOT NULL,
  "translation_id" INT NOT NULL REFERENCES "translation"("id"),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE user_role AS ENUM('learner', 'teacher');

CREATE TABLE "language_user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "language_id" INT NOT NULL REFERENCES "language"("id"),
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "role" user_role NOT NULL
);

COMMIT;
