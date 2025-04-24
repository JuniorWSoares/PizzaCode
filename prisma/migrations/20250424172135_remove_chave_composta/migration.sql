/*
  Warnings:

  - The primary key for the `OrderPizzas` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderPizzas_pkey" PRIMARY KEY ("id");
