const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

//cargamos archivo .env
dotenv.config();

//inicializamos app de express
const app = express();

//para poder leer el BODY de la peticion
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', routes);


//Levantamos server a la escucha de un puerto determinado
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, (err, res) => {

    if(err){
        return console.log(`Error trying to connect to data base ${err}`);
    }
    console.log('Succesfully connected to data base!!')
    app.listen(process.env.PORT, (error) => {
        if(error){
            console.log('Error al levantar el servidor')
        }else{
            console.log(`Server running on port ${process.env.PORT}`)
        }
    })
})



