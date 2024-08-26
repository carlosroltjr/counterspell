-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);
