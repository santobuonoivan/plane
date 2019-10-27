const { plane } = require('../../db/db.mariadb.config');
const planeService = require('../services/planes');
const _ = require('lodash');


/* GET ALL */
exports.all_planes = async function (req, res, next) {
    try{
        const planesList = await plane.findAll({include:['plane_type']});
        if(planesList.length > 0)
            return res.send({
                ok:true,
                planesList
            });
        return res.send({ok: false, message: 'planes not found'});
    }catch (e) {
        return res.status(400).send({error: e.errors[0].message});
    }
};


/* GET ALL BY TYPE */
exports.all_planes_by_type = async function (req, res, next) {
    try{
        let { type_id } = req.params;
        const planesList = await plane.findAll({
            where:{'plane_type_id': type_id},
            include:['plane_type','estructure'],
        });
        if(planesList.length > 0)
            return res.send({
                ok:true,
                planesList
            });
        return res.send({ok: false, message: 'planes by type not found'});
    }catch (e) {
        return res.status(400).send({error: e.errors.message});
    }
};

/* ADD ONE */
exports.insert_plane = async function (req, res, next) {
    //const { error } = planeService.validateplane(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    let planes = await plane.findAll({where:{'plane_code':req.body.plane_code}});

    if(planes.length > 0) return res.status(400).send({
        ok:false,
        menssage:'Ya hay un plane con el plane_code asignado'
    });
    let result = null, cont = 0;
    while(result == null && cont <=3){
        try{
            let maxId = await plane.sequelize.query("select max(plane_id) as max from planes");
            maxId = maxId[0][0].max;
            maxId +=1 ;
            req.body.id = maxId;
            result = await plane.create(req.body);
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
exports.update_plane = async function (req, res, next) {
    //const { error } = planeService.validateplane(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    try {
        let result = await plane.update(req.body,{where: {plane_id:req.params.id}});
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
exports.delete_plane = async function(req, res, next){
    try {
        let result = await plane.update({activo:false},{where:{plane_id:req.params.id}});
        //console.log(result);
        return res.send({
            ok:true,
            menssage: `${result} planes deleted`
        });
    }catch (e) {
        return res.status(400).send({
            ok:false,
            menssage:`no se puede desactivar/borrar el plane: ${e.errors[0].message}`
        });
    }
};

/* GET ONE */
exports.show_plane = async function (req, res, next) {
    try {
        let result = await plane.findOne({
            where: {
                plane_id: req.params.id
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


exports.plane_documentacion = async function (req, res, next) {
    try {
        const plane = await plane.findOne({
            where:{plane_id:req.params.id},
            include:['documentacion']
        }).catch( reason => {
            console.log(reason);
        });
        if(!plane) return res.status(404).send("plane nor found");
        return res.send(plane);
    }catch (e) {
        return res.status(400).send(e.errors[0].message);
    }
};

/*
exports.plane_carrera = async function (req, res, next) {
    try {
        const plane = await plane.findOne({
            where:{plane_id:req.params.id},
            include:['carrera']
        }).catch( reason => {
            console.log(reason);
        });
        if(!plane) return res.status(404).send("plane nor found");
        return res.send(plane);
    }catch (e) {
        return res.status(400).send(e.errors[0].message);
    }
};
*/
exports.plane_cuotas_pagos = async function (req, res, next) {
    try {
        const plane = await plane.findOne({
            where:{plane_id:req.params.id},
            include:['cuotas','pagos']
        }).catch( reason => {
            console.log(reason);
        });
        if(!plane) return res.status(404).send("plane nor found");
        return res.send(plane);
    }catch (e) {
        return res.status(400).send(e.errors[0].message);
    }
};

exports.plane_full_info = async function (req, res, next) {
    try {
        const plane = await plane.findOne({
            where:{plane_id:req.params.id},
            include:['cuotas','pagos','documentacion']
        }).catch( reason => {
            console.log(reason);
        });
        if(!plane) return res.status(404).send("plane nor found");
        return res.send(plane);
    }catch (e) {
        return res.status(400).send(e.errors[0].message);
    }
};

/*
exports.plane_add_locations = async function (req, res, next) {

    const plane = await plane.findOne(
        {
            where:{id_plane:req.params.id}
        }
    )
    let locationList = await locations.findAll({where:{location_name:req.body.location_name}});
    if(locationList.length > 0) return res.status(400).send('There is at least a locations with the same name, please assign a different location name');
    let result = null, cont = 0;
    while(result == null && cont <=3){
        try{
            let maxId = await locations.sequelize.query("select max(id_location) from locations");
            maxId = maxId[0][0].max;
            maxId +=1;
            req.body.id_location = maxId;
            req.body.id_plane = plane.id_plane;
            result = await locations.create(req.body);
        }catch (e) {
            cont += 1;
        }
    }
    if(cont > 3){
        return res.status(400).send("server does not respond please try again");
    }
    if(result){
        return res.send(result)
    }
};

exports.plane_remove_locations = async function (req, res, next) {
    try{
        let plane = await plane.findOne({
            where:{id_plane:req.params.id},
            include:['locations']
        });
        if(!plane) return res.status(404).send("plane not found");
        if(req.body.locations.length){
            for(let i=0; i<req.body.locations.length; i++)
            {
                let dl = await locations.destroy({
                    where:{
                        id_plane: plane.id_plane,
                        id_location: req.body.locations[i]
                    }
                });
                console.log(dl);
            }
        }
        plane = await plane.findOne({
            where:{id_plane:req.params.id},
            include:['locations']
        });
        return res.json({message:"locations removed",plane:plane});
    }catch (e) {
        return res.status(400).send(e.errors[0].message);
    }
};*/