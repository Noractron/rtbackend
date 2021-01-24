'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_zona_ejercicio extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            tbl_zona_ejercicio.belongsTo(models.tbl_personaje,
                {
                    as: 'tbl_personaje',
                    foreignKey: 'personaje_id',
                }),
            tbl_zona_ejercicio.belongsToMany(models.tbl_entrenador, {
                foreignKey: 'zona_ejercicio_id',
                through: 'tbl_entrenador_zona',
                as: 'tbl_entrenador',
                timestamps: false,
                freezeTableName: true,
            });
        }
    };
    tbl_zona_ejercicio.init({
        id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
        nombre_planeta: DataTypes.STRING,
        gravedad: DataTypes.STRING,
        activo: DataTypes.INTEGER.UNSIGNED,
        planeta_id: DataTypes.INTEGER.UNSIGNED,
        personaje_id: DataTypes.INTEGER.UNSIGNED,
    }, {
        sequelize,
        modelName: 'tbl_zona_ejercicio',
        freezeTableName: true,
        timestamps: false,
    });
    return tbl_zona_ejercicio;
};