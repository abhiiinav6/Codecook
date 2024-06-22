/*
  Warnings:

  - Added the required column `tags` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `problem` ADD COLUMN `tags` VARCHAR(191) NOT NULL;
