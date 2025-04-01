/*
  Warnings:

  - You are about to drop the `SizeAndPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PizzaSizesEnum" AS ENUM ('P', 'M', 'G');

-- DropForeignKey
ALTER TABLE "SizeAndPrice" DROP CONSTRAINT "SizeAndPrice_pizzaId_fkey";

-- DropTable
DROP TABLE "SizeAndPrice";

-- DropEnum
DROP TYPE "PizzaSizes";

-- CreateTable
CREATE TABLE "PizzaSize" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "size" "PizzaSizesEnum" NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "PizzaSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PizzaSize" ADD CONSTRAINT "PizzaSize_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
