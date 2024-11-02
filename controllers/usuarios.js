const { response, request} = require('express');

const usuariosGet = (req, res) => {

    const {q, nombre = 'No name', apikey, page=1, limit} = req.query;


    res.json({
        msg: 'Get Api - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body

    res.json({
        msg: 'Post Api - Controlador',
        nombre, 
        edad
    });
}
const usuariosPut = (req, res) => {

    const id = req.params.id

    res.json({
        msg: 'Put Api - Controlador',
        id
    });
}


const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch Api - Controlador'
    });
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete Api - Controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}