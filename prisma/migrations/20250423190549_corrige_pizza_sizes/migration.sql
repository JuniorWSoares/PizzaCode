/*
  Warnings:

  - You are about to drop the column `description` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the `OrderPizzaSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PizzaSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pizzaTypeId` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pizza` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderPizzaSizes" DROP CONSTRAINT "OrderPizzaSizes_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderPizzaSizes" DROP CONSTRAINT "OrderPizzaSizes_pizzaSizeId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaSize" DROP CONSTRAINT "PizzaSize_pizzaId_fkey";

-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "pizzaTypeId" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "size" CHAR(1) NOT NULL;

-- DropTable
DROP TABLE "OrderPizzaSizes";

-- DropTable
DROP TABLE "PizzaSize";

-- CreateTable
CREATE TABLE "PizzaType" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "PizzaType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPizzas" (
    "pizzaId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderPizzas_pkey" PRIMARY KEY ("pizzaId","orderId")
);

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_pizzaTypeId_fkey" FOREIGN KEY ("pizzaTypeId") REFERENCES "PizzaType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
