const express = require('express');
const cors = require('cors')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios'

        //Middelwares
        this.middlewares()
        //Rutas de aplicacion

        this.routes();
    }

    middlewares(){
        
        //Cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') )

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server;