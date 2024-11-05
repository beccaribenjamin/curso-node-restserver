
const mongoose = require('mongoose');

/*A revisar el siguiente codigo*/

const dotenv = require('dotenv');
dotenv.config({path:"./.env"})

/* Hasta acá revisar */

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Base de Datos online')

    } catch( error ){
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }

}

module.exports = {
    dbConnection
}