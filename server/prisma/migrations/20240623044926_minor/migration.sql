/*
  Warnings:

  - A unique constraint covering the columns `[problem_id]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `problem` ALTER COLUMN `problem_id` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Problem_problem_id_key` ON `Problem`(`problem_id`);
