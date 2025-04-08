/*
  Warnings:

  - Changed the type of `size` on the `PizzaSize` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PizzaSize" DROP COLUMN "size",
ADD COLUMN     "size" CHAR(1) NOT NULL;

-- DropEnum
DROP TYPE "PizzaSizesEnum";
