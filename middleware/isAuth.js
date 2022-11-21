// en este caso solo usamos un middleware para la validacion del JWT
const { loginService } = require('../services/index');

const isAuth = (req, res, next) => {

//el TOKEN viaja en los 'HEADER'= key=AUTHORIZATION - VALUE= bearer jfhuefhjehfheuf(TOKEN)

    if(!req.headers.authorization){
        return res.status(401).send('The user is not logged in');
    }
     const token = req.headers.authorization.split(" ")[1]; //para q no nos devuelva el 'bearer'(q esta en posicion 0), entonces solo devuelve la posicion 1(TOKEN)
        
     loginService.decodeToken(token).then((result) => {
        req.user = result;
        next();
     }).catch((err) => {
        return res.status(err.status).send(err)
     }) 
     
}

module.exports = isAuth;