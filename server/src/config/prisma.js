const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Kết nối MySQL thành công qua Prisma!');
    } catch (error) {
        console.error('❌ Lỗi kết nối Database:', error);
        process.exit(1);
    }
};

module.exports = { prisma, connectDB };