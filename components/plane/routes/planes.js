const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const cors = require('cors');
/*
const authMiddleware = require('../../../middleware/auth')
const authorization = require('../../../middleware/authorization');
*/
const planesController = require('../controllers/planes');
            //where:{type_id},

/* GET ALL */
router.get('/',[cors()/*, authMiddleware, authorization('clients','list')*/ ], planesController.all_planes);
router.get('/by_type/:type_id',[cors()/*, authMiddleware, authorization('clients','list')*/ ], planesController.all_planes_by_type);

/* ADD ONE */
router.post('/',[cors()/*, authMiddleware, authorization('clients','insert' )*/], planesController.insert_plane);

/* UPDATE ONE */
//router.put('/:id',[cors()/*, authMiddleware, authorization('clients','update')*/], planesController.update_plane);

/* DELETE ONE (DESACTIVATE) */
//router.post('/:id',[cors()/*, authMiddleware, authorization('clients','delete')*/], planesController.delete_plane);

/* GET ONE */
//router.get('/:id',[cors()/*, authMiddleware, authorization('clients', 'show')*/], planesController.show_plane);

module.exports = router;
