/*
  Warnings:

  - You are about to drop the column `errorMessage` on the `testcaseresult` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `testcaseresult` table. All the data in the column will be lost.
  - Added the required column `memory` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `testcaseresult` DROP COLUMN `errorMessage`,
    DROP COLUMN `output`,
    ADD COLUMN `compile_output` VARCHAR(191) NULL,
    ADD COLUMN `memory` INTEGER NOT NULL,
    ADD COLUMN `message` VARCHAR(191) NULL,
    ADD COLUMN `stderr` VARCHAR(191) NULL,
    ADD COLUMN `stdout` VARCHAR(191) NULL,
    ADD COLUMN `time` DOUBLE NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
