/*
  Warnings:

  - The primary key for the `OrderPizzas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderPizzas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderPizzas_pkey" PRIMARY KEY ("pizzaId", "orderId");
