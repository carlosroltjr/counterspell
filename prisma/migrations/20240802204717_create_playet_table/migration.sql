-- CreateTable
CREATE TABLE "Player" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mainRole" TEXT NOT NULL,
    "mainHeroes" TEXT[],
    "searchHistory" TEXT[],

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
