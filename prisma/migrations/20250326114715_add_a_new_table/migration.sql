/*
  Warnings:

  - You are about to drop the column `price` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Pizza` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PizzaSizes" AS ENUM ('P', 'M', 'G');

-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "price",
DROP COLUMN "size";

-- DropEnum
DROP TYPE "PizzaSize";

-- CreateTable
CREATE TABLE "SizeAndPrice" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "size" "PizzaSizes" NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "SizeAndPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- AddForeignKey
ALTER TABLE "SizeAndPrice" ADD CONSTRAINT "SizeAndPrice_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
