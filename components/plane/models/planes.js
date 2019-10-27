/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('planes', {
    plane_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plane_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    plane_type_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'plane_type',
        key: 'plane_type_id'
      }
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    estructure_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'estructures',
        key: 'estructure_id'
      }
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'planes',
    timestamps: false,
    underscored: true
  });
};
