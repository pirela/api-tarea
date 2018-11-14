
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tarea', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    tarea: {
      type: DataTypes.STRING(255)
    },
    descripcion: {
      type: DataTypes.STRING(255)
    },
    idTiempo: {
      field: 'id_tiempo',
      type: DataTypes.STRING(255),
      references: {
        model: 'tiempo',
        key: 'id'
      }
    },
    tiempoIni: {
      field: 'tiempo_ini',
      type: DataTypes.INTEGER(11)
    },
    tiempoFin: {
      field: 'tiempo_fin',
      type: DataTypes.INTEGER(11)
    },
    tiempoRealizado: {
      field: 'tiempo_realizado',
      type: DataTypes.INTEGER(11)
    },
    completada: {
      type: DataTypes.INTEGER(1)
    },
    cantPausa: {
      field: 'cant_pausa',
      type: DataTypes.INTEGER(11)
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    createdUsu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updatedUsu: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tarea'
  });
};
