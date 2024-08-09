-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mainRole" TEXT NOT NULL,
    "mainHeroes" TEXT[],
    "searchHistory" TEXT[],

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "lowestMatchId" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);
