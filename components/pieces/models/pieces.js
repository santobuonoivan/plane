/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pieces', {
    piece_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    weight: {
      type: "DOUBLE",
      allowNull: true
    },
    height: {
      type: "DOUBLE",
      allowNull: true
    },
    width: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'pieces',
      timestamps: false,
      underscored: true
  });
};
