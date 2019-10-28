const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const cors = require('cors');
/*
const authMiddleware = require('../../../middleware/auth')
const authorization = require('../../../middleware/authorization');
*/
const piecesController = require('../controllers/pieces');

/* GET ALL */
router.get('/',[cors()/*, authMiddleware, authorization('clients','list')*/ ], piecesController.all_pieces);
router.get('/by_type/:type_id',[cors()/*, authMiddleware, authorization('clients','list')*/ ], piecesController.all_pieces_by_type);

/* ADD ONE */
router.post('/',[cors()/*, authMiddleware, authorization('clients','insert' )*/], piecesController.insert_piece);

/* UPDATE ONE */
router.put('/:piece_id',[cors()/*, authMiddleware, authorization('clients','update')*/], piecesController.update_piece);

/* DELETE ONE (DESACTIVATE) */
//router.post('/:piece_id',[cors()/*, authMiddleware, authorization('clients','delete')*/], piecesController.delete_piece);

/* GET ONE */
router.get('/:piece_id',[cors()/*, authMiddleware, authorization('clients', 'show')*/], piecesController.show_piece);

module.exports = router;