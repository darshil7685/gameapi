const config = require('../config/db.config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};
async function initialize() {

    const { HOST, PORT, USER, PASSWORD, DATABASE } = config;
    // const connection = await mysql.createConnection({ HOST, PORT, USER, PASSWORD });
    // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}}\`;`);

    const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { dialect: 'mysql' });

    db.User = require('../User/user.model')(sequelize);
    await sequelize.sync();
}
initialize();
