'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_personaje extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            tbl_personaje.hasMany(models.tbl_zona_ejercicio,
                {
                  as: 'tbl_zona_ejercicio',
                  foreignKey: 'id',
                }
              )
        }
    };
    tbl_personaje.init({
        id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.STRING,
        IMC: DataTypes.DECIMAL,
        composicion: DataTypes.STRING,
        swappi_id: DataTypes.INTEGER.UNSIGNED,
        activo:DataTypes.INTEGER.UNSIGNED,
    }, {
        sequelize,
        modelName: 'tbl_personaje',
        freezeTableName: true,
        timestamps: false,
    });
    return tbl_personaje;
};