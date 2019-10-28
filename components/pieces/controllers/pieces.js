const { piece } = require('../../db/db.mariadb.config');
const pieceService = require('../services/pieces');
const _ = require('lodash');


/* GET ALL */
exports.all_pieces = async function (req, res, next) {
    try{
        const piecesList = await piece.findAll(/*{ include:['piece_type','estructure']}*/);
        if(piecesList.length > 0)
            return res.send({ ok:true, piecesList });
        return res.send({ok: false, message: 'pieces not found'});
    }catch (e) {
        return res.status(400).send({error: e.errors.message});
    }
};


/* ADD ONE */
exports.insert_piece = async function (req, res, next) {
    //const { error } = pieceService.validatepiece(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    let pieces = await piece.findAll({where:{'piece_code':req.body.piece_code}});

    if(pieces.length > 0) return res.status(400).send({
        ok:false,
        menssage:'Ya hay un piece con el piece_code asignado'
    });
    let result = null, cont = 0;
    while(result == null && cont <=3){
        try{
            let maxId = await piece.sequelize.query("select max(piece_id) as max from pieces");
            maxId = maxId[0][0].max;
            maxId +=1 ;
            req.body.id = maxId;
            result = await piece.create(req.body);
        }catch (e) {
            cont += 1;
        }
    }
    if(cont > 3){
        return res.status(400).send({
            ok:false,
            menssage:"el servidor no puede responder, vuelva a intentarlo"
        });
    }
    if(result){
        console.log(result);
        return res.send({
            ok:true,
            result
        })
    }
};

/* UPDATE ONE */
exports.update_piece = async function (req, res, next) {
    //const { error } = pieceService.validatepiece(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    try {
        let result = await piece.update(req.body,{where: {piece_id:req.params.piece_id}});
        return res.send({
            ok: true,
            menssage: `${ result } records updated`
        });
    }catch (e) {
        return res.status(400).send({
            ok: false,
            menssage: `can't update record: ${e.errors[0].message}`
        });
    }
};

/* DELETE ONE (desactivar)*/
exports.delete_piece = async function(req, res, next){
    try {
        let result = await piece.update({activo:false},{where:{piece_id:req.params.id}});
        //console.log(result);
        return res.send({
            ok:true,
            menssage: `${result} pieces deleted`
        });
    }catch (e) {
        return res.status(400).send({
            ok:false,
            menssage:`no se puede desactivar/borrar el piece: ${e.errors[0].message}`
        });
    }
};

/* GET ONE */
exports.show_piece = async function (req, res, next) {
    try {
        let result = await piece.findOne({
            include: ['estructure','piece_type'],
            where: {
                piece_id: req.params.piece_id
                /*
                $or: [
                    {
                        id: {
                            $like: req.param.id
                        }
                    },
                    {
                        dni: {
                            $like: req.param.dni
                        }
                    },
                    {
                        nombre: {
                            $like: '%'+ req.param.nombre+'%'
                        }
                    },
                    {
                        apellido: {
                            $like: '%'+ req.param.apellido +'%'
                        }
                    }
                ]

                 */
            }
        });
        if(!result) return res.send({
            ok: false,
            menssage:'Usuario no encontrado'
        });
        //console.log(result);
        return res.send({
            ok: true,
            result
        });
    }catch (e) {
        return res.status(400).send({
            ok: false,
            message: e.errors[0].message
        });
    }
};
