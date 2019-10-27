/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plane_type', {
    plane_type_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'plane_type',
      timestamps: false,
      underscored: true
  });
};
