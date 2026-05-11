const {prisma} = require('../config/prisma');

const getUser = async (req, res) => {
    try {
        // 1. Get userId
        const userId = req.user.userId;
        // 2. Query database to get user info
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                active: true,
                avatar: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return res.status(200).json({
            success: true,
            data: user,
            message: "Get user successfully",
        })
    } catch (error) {
        return res.status(500).json({message: "Error" + error.message})
    }
}

module.exports = { getUser }