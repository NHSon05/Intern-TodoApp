const { prisma } = require('../config/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body;

        /*1. Validation */
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({message: "Please fill full your information"});
        }
        /*2. Check password  */
        if (password !== confirmPassword) {
            return res.status(400).json({message: "Password does not match"})
        }
        /*3. Check exist email */
        const userExists = await prisma.user.findUnique({where : { email }})
        if (userExists) {
            return res.status(400).json({message: "Email already exists"})
        }
        /*4. Hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        /*5. Save to db */
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                active: true
            },
            select: {
                id:  true,
                name: true,
                email: true,
                role: true,
                active: true,
            }
        })
        /*6. Response */
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: "Error:" + error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        /*1. Validation */
        if (!email || !password) {
            return res.status(400).json({message: "Please fill your information"})
        }
        /*2. Find user in database */
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        /*3. Compare password */
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({message: "Invalid Credentials"})
        }
        /*4. Generate JWT */
        const payload = {
            userId: user.id,
            role: user.role,
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        })
        /*5. Response */
        return res.status(200).json({
            message: "Login successfully",
            accessToken,
            userId: user.id
        })
    } catch (error) {
        res.status(500).json({message: "Error " + error.message})
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error: " + error.message });
    }
};

module.exports = { register, login, logout}