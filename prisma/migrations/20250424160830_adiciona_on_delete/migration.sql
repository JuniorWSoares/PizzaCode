-- DropForeignKey
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderPizzas" DROP CONSTRAINT "OrderPizzas_pizzaId_fkey";

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
