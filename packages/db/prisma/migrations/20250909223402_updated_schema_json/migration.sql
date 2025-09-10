/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardContainer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_containerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CardContainer" DROP CONSTRAINT "CardContainer_boardId_fkey";

-- AlterTable
ALTER TABLE "public"."Board" ADD COLUMN     "data" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."Card";

-- DropTable
DROP TABLE "public"."CardContainer";
