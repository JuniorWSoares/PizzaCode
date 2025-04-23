/*
  Warnings:

  - You are about to drop the `OrderPizzas` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_pizzaId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "OrderPizzas";

-- CreateTable
CREATE TABLE "OrderPizzaSizes" (
    "pizzaSizeId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderPizzaSizes_pkey" PRIMARY KEY ("pizzaSizeId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrderPizzaSizes" ADD CONSTRAINT "OrderPizzaSizes_pizzaSizeId_fkey" FOREIGN KEY ("pizzaSizeId") REFERENCES "PizzaSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzaSizes" ADD CONSTRAINT "OrderPizzaSizes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
