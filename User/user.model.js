const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        gems: { type: DataTypes.BIGINT, allowNull: false },
        fb_username: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING }
    };

    return sequelize.define('User', attributes);
}