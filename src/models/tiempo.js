
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiempo', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255)
    },
    tiempoIni: {
      field: 'tiempo_ini',
      type: DataTypes.INTEGER(10)
    },
    tiempoFin: {
      field: 'tiempo_fin',
      type: DataTypes.INTEGER(10)
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true
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
    tableName: 'tiempo'
  });
};
