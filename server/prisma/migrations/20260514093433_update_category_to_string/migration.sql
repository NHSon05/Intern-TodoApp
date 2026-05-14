/*
  Warnings:

  - You are about to alter the column `category` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- AlterTable
ALTER TABLE `Task` MODIFY `category` VARCHAR(191) NOT NULL DEFAULT 'General';

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
