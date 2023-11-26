// controllers/UserController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { username },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
};
