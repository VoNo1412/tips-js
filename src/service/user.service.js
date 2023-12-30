const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function createUser(username, password, role, permission) {
    const user = await User.create({
        username,
        password,
        role,
        permission,
        created_at: new Date(),
    });
    return { status: 200, data: user };
}

async function getUserById(userId) {
    return await User.findByPk(userId);
}

async function getUserByUsername(username) {
    return await User.findOne({
        where: { username: username },
    });
}

async function updateUser(userId, newData) {
    const { username, password, role, permission } = newData;
    const [updatedRowCount, updatedUsers] = await User.update(
        { username, password, role, permission },
        { returning: true, where: { id: userId } }
    );

    return updatedRowCount > 0 ? updatedUsers[0].toJSON() : null;
}

async function deleteUser(userId) {
    const deletedUser = await User.findByPk(userId);
    if (deletedUser) {
        await deletedUser.destroy();
        return deletedUser.toJSON();
    }
    return null;
}

async function getAllUsers() {
    return await User.findAll();
}

async function verifyPassword(infoUser) {
    const user = await getUserByUsername(infoUser.username);
    return bcrypt.compare(infoUser.password, user.dataValues.password);
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserByUsername,
    verifyPassword
};