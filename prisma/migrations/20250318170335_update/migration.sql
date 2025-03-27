/*
  Warnings:

  - You are about to drop the `_OrderPizzas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderPizzas" DROP CONSTRAINT "_OrderPizzas_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderPizzas" DROP CONSTRAINT "_OrderPizzas_B_fkey";

-- DropTable
DROP TABLE "_OrderPizzas";

-- CreateTable
CREATE TABLE "OrderPizzas" (
    "pizzaId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderPizzas_pkey" PRIMARY KEY ("pizzaId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
