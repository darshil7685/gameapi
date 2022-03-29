const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        SelectBodyType:{type:DataTypes.STRING},
        CurrentType:{type:DataTypes.INTEGER},
        HasColorChangeOption:{type:DataTypes.BOOLEAN},
        CurrentColortone:{type:DataTypes.INTEGER}

        
    };

    return sequelize.define('BodyTypeList', attributes,{timestamps:false});
}