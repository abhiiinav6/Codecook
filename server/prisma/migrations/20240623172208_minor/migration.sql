/*
  Warnings:

  - You are about to drop the column `memory` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `submission` DROP COLUMN `memory`,
    DROP COLUMN `time`;

-- AlterTable
ALTER TABLE `testcaseresult` MODIFY `memory` INTEGER NULL,
    MODIFY `time` DOUBLE NULL;
