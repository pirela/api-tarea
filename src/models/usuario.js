
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    identificacion: {
      type: DataTypes.STRING(255)
    },
    nombre: {
      type: DataTypes.STRING(255),
    },
    apellido: {
      type: DataTypes.INTEGER(11)
    },
    email: {
      type: DataTypes.INTEGER(11)
    },
    telefono: {
      type: DataTypes.INTEGER(11)
    },
    gitHub: {
      field: 'git_hub',
      type: DataTypes.STRING(255),
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
    tableName: 'usuario'
  });
};
