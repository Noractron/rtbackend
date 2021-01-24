'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tbl_entrenador_zona extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            tbl_entrenador_zona.belongsTo(
                models.tbl_entrenador,
                {
                    foreignKey: 'entrenador_id',
                    as: 'tbl_entrenador'
                });
                tbl_entrenador_zona.belongsTo(
                models.tbl_zona_ejercicio,
                {
                    foreignKey: 'zona_ejercicio_id',
                    as: 'tbl_zona_ejercicio'
                });
        }
    };
    tbl_entrenador_zona.init({
        id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
        entrenador_id: DataTypes.INTEGER,
        zona_ejercicio_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'tbl_entrenador_zona',
        freezeTableName: true,
        timestamps: false,
    });
    return tbl_entrenador_zona;
};