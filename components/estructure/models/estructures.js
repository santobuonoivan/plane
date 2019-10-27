/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estructures', {
    estructure_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    estructure_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'estructures',
      timestamps: false,
      underscored: true
  });
};
