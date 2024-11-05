const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
/*
De aca hay nuevo
*/

dotenv.config({path: "./.env"})


/*
Hasta aca 
*/



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