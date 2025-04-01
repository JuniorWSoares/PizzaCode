-- DropForeignKey
ALTER TABLE "PizzaSize" DROP CONSTRAINT "PizzaSize_pizzaId_fkey";

-- AddForeignKey
ALTER TABLE "PizzaSize" ADD CONSTRAINT "PizzaSize_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
