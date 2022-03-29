const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.BIGINT, allowNull: false ,primaryKey:true,unique:true },
        user_mail:{type:DataTypes.STRING,unique:true},
        user_name: { type: DataTypes.STRING},
        user_password: { type: DataTypes.STRING },
        user_logintype: { type: DataTypes.STRING,allowNull:false },
        user_isActive:{type:DataTypes.BOOLEAN ,defaultValue:false},
        user_amount:{type:DataTypes.FLOAT},
        user_debit_amount:{type:DataTypes.FLOAT}
    };

    return sequelize.define('UserDetail', attributes,{timestamps:false});
}