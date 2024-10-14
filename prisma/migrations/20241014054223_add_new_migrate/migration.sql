/*
  Warnings:

  - The values [CLOSED] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropIndex
DROP INDEX `Account_userId_idx` ON `account`;

-- DropIndex
DROP INDEX `Account_userId_key` ON `account`;

-- DropIndex
DROP INDEX `Issue_assignedToUserId_fkey` ON `issue`;

-- DropIndex
DROP INDEX `Session_userId_idx` ON `session`;

-- AlterTable
ALTER TABLE `issue` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSE') NOT NULL DEFAULT 'OPEN';

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
