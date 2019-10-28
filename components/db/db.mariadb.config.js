const {username,password,database,host,port,dialect, pool} = require('./mariadb.config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password, {
    host: host,
    dialect: dialect,
    port: port
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../../users/models/users')(sequelize,Sequelize);
db.roles = require('../../users/models/roles')(sequelize,Sequelize);
db.user_roles = require('../../users/models/user_roles')(sequelize,Sequelize);
db.permissions = require('../../users/models/permissions')(sequelize,Sequelize);
db.permission_user = require('../../users/models/permission_user')(sequelize,Sequelize);
db.permission_role = require('../../users/models/permission_role')(sequelize, Sequelize);
db.plane = require('../../components/plane/models/planes')(sequelize, Sequelize);
db.plane_type = require('../../components/plane/models/plane_type')(sequelize, Sequelize);
db.estructure = require('../../components/estructure/models/estructures')(sequelize, Sequelize);
db.piece = require('../../components/pieces/models/pieces')(sequelize, Sequelize);



// Alumno
/*
db.cuota.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.cuota, {as: 'cuotas', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.pagos.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.pagos, {as: 'pagos', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.documentacion.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.documentacion, {as: 'documentacion', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
*/

//sequelize-auto -h localhost -d plane -u root -x "" -p 3306 -mysql

// Permissions Roles
db.users.belongsToMany(db.roles, {through:'user_roles', foreignKey:'usuario_id',otherKey:'role_id'});
db.roles.belongsToMany(db.users, {through: 'user_roles', foreignKey: 'role_id'});
db.users.belongsToMany(db.permissions, {through: 'permission_user', foreignKey:'usuario_id', otherKey: 'permission_id'});
db.permissions.belongsToMany(db.users, {through:'permission_user', foreignKey:'permission_id'});
db.roles.belongsTo(db.roles, {foreignKey:'parent'});
db.permissions.belongsToMany(db.roles, {through: 'permission_role', foreignKey:'permission_id', otherKey:'role_id'});

db.plane.belongsTo(db.plane_type, {as: 'plane_type', foreignKey:'plane_type_id', targetKey:'plane_type_id', sourceKey:'plane_type_id'});
db.plane_type.hasMany(db.plane, {as: 'planes', foreignKey:'plane_type_id', targetKey:'plane_type_id', sourceKey:'plane_type_id'});
db.plane.belongsTo(db.estructure, {as: 'estructure', foreignKey:'estructure_id', targetKey:'estructure_id', sourceKey:'estructure_id'});
db.estructure.hasMany(db.plane, {as: 'planes', foreignKey:'estructure_id', targetKey:'estructure_id', sourceKey:'estructure_id'});


db.sequelize.sync({force:false}).then(() =>  {});

module.exports =  db;

