const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        champion_id: { type: DataTypes.INTEGER, allowNull: false ,autoIncrement: true,primaryKey:true,unique:true },
        champion_index:{type:DataTypes.INTEGER},
        champion_changes_number:{type:DataTypes.INTEGER},
        champion_name:{type:DataTypes.STRING},
        champion_price:{type:DataTypes.FLOAT},
        champion_purchased:{type:DataTypes.BOOLEAN},
        select_gender:{type:DataTypes.STRING},
        current_skintone:{type:DataTypes.INTEGER}
        
    };

    return sequelize.define('ChampionDetails', attributes,{timestamps:false});
}