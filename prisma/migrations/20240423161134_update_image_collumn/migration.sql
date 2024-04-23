/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `image`,
    ADD COLUMN `imageBuffer` LONGBLOB NULL,
    ADD COLUMN `imageType` VARCHAR(10) NULL;