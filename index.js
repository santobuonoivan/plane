const express = require('express');
const morgan = require('morgan');
//const cors = require('./Auth/cors'); TODO modificar cors manual
const cors = require('cors');
const env = require('dotenv').config();
//const authMiddleware = require('./middleware/auth');
//const authorization = require('./middleware/authorization');
//Settings
const port = process.env.NODE_PORT || 3000;
const app = express();
const db = require('./components/db/db.mariadb.config');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//app.use(express.static('./public'));

// Routes
const authRouter = require('./Auth/AuthRoutes');
const userRoutes = require('./users/routes/UserRoutes');
const rolesRoutes = require('./users/routes/RoleRoutes');
const permissionsRoutes = require('./users/routes/PermissionsRoutes');
const userRolerRoutes = require('./users/routes/UserRolesRoutes');
const userPermissions = require('./users/routes/UserPermissionsRoutes');
const planeRoutes = require('./components/plane/routes/planes');
const piecesRoutes = require('./components/pieces/routes/pieces');

app.use('/users', userRoutes);
app.use('/auth',authRouter);
app.use('/roles', rolesRoutes);
app.use('/permissions', permissionsRoutes);
app.use('/userroles', userRolerRoutes);
app.use('/userpermissions', userPermissions);
app.use('/plane', planeRoutes);
app.use('/piece',piecesRoutes);



app.listen(port, function () {
    console.log(`application up and running on port: ${port}`);
});