/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pieces_x_plane', {
    piece_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pieces',
        key: 'piece_id'
      }
    },
    plane_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'planes',
        key: 'plane_id'
      }
    }
  }, {
    tableName: 'pieces_x_plane',
      timestamps: false,
      underscored: true
  });
};
