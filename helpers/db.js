const config = require('../config/db.config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};
async function initialize() {

    const { HOST, PORT, USER, PASSWORD, DATABASE } = config;
    // const connection = await mysql.createConnection({ HOST, PORT, USER, PASSWORD });
    // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}}\`;`);

    const sequelize = new Sequelize(DATABASE, USER, PASSWORD, { dialect: 'mysql' ,host: HOST,
    port: PORT});

    db.User = require('../User/user.model')(sequelize);
    db.UserDetails =require('../User_Details/userDetails.model')(sequelize);
    db.ChampionDetails=require('../Champion_Details/championDetails.model')(sequelize);
    db.bodyTypes=require('../Champion_Details/bodytype.model')(sequelize);

    db.UserDetails.hasMany(db.ChampionDetails);
    db.ChampionDetails.belongsTo(db.UserDetails,{foreignKey:'user_id',as:'user'});

    db.ChampionDetails.hasMany(db.bodyTypes);
    db.bodyTypes.belongsTo(db.ChampionDetails,{foreignKey:'champion_id',as:'champion'});

    await sequelize.sync();
}
initialize();
