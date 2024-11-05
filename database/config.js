const mongoose = require('mongoose');
require('dotenv').config()
dotenv.config({path: "./.env"})


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