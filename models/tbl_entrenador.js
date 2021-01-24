'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_entrenador extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            tbl_entrenador.belongsToMany(models.tbl_zona_ejercicio, {
                foreignKey: 'entrenador_id',
                through: 'tbl_entrenador_zona',
                as: 'tbl_zona_ejercicio',
                timestamps: false,
                freezeTableName: true,
            });
        }
    };
    tbl_entrenador.init({
        id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        edad: DataTypes.INTEGER.UNSIGNED,
        codigo_imperial: DataTypes.STRING,
        religion:DataTypes.STRING,
        activo:DataTypes.INTEGER.UNSIGNED,
    }, {
        sequelize,
        modelName: 'tbl_entrenador',
        freezeTableName: true,
        timestamps: false,
    });
    return tbl_entrenador;
};