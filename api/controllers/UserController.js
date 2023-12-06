// controllers/UserController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getUsers = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    try {
        const user = await prisma.user.findUnique({
            where: { auth0Id },
        });
        //console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    try {
        const { name } = req.body;

        const updatedUser = await prisma.user.update({
            where: { auth0Id },
            data: { name },
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
