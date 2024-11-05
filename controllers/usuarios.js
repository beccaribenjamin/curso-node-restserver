const { response, request} = require('express');
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario');



const usuariosGet = async(req, res) => {
    
    const {limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res) => {
    
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

    //Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo: correo });
    // if( existeEmail ){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     })
    // }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );


    //Guardar en BD
    await usuario.save()

    res.json({
        msg: 'Post Api - Controlador',
        usuario,
    });
}
const usuariosPut = async(req, res) => {

    const id = req.params.id;
    const { _id, password, correo, google, ...resto } = req.body;

    //TODO validar contra BD
    if( password ){
        //Encriptar Contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({
        msg: 'Put Api - Controlador',
        usuario
    });
}


const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch Api - Controlador'
    });
}
const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id ); ---> Esta opcion no es la mejor porque perdemos la unidad referencial de la persona

    //Cambiando el estado es mucho mejor
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} )

    res.json({
        msg: 'Delete Api - Controlador',
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}