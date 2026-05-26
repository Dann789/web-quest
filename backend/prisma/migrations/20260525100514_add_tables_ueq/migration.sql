-- CreateEnum
CREATE TYPE "UEQCategory" AS ENUM ('ATTRACTIVENESS', 'EFFICIENCY', 'PERSPICUITY', 'DEPENDABILITY', 'STIMULATION', 'NOVELTY');

-- CreateTable
CREATE TABLE "UEQQuestion" (
    "id" SERIAL NOT NULL,
    "leftWord" TEXT NOT NULL,
    "rightWord" TEXT NOT NULL,
    "category" "UEQCategory" NOT NULL,

    CONSTRAINT "UEQQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UEQSession" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UEQSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UEQAnswer" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "UEQAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UEQSession" ADD CONSTRAINT "UEQSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UEQAnswer" ADD CONSTRAINT "UEQAnswer_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "UEQSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UEQAnswer" ADD CONSTRAINT "UEQAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "UEQQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
