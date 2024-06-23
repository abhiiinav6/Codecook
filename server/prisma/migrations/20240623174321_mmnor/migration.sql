/*
  Warnings:

  - The values [FAILED,TLE,MLE] on the enum `TestCaseResult_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `testcaseresult` MODIFY `status` ENUM('ACCEPTED', 'REJECTED', 'WAITING') NOT NULL DEFAULT 'ACCEPTED';
