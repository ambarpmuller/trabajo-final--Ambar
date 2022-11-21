//genera y valida el JWT - el MIDDLEWARE usa este service!!
//la logica del JWT
//PARA GENERAR EL JWT NECESITAMOS LA LIBRERIA JWT-SIMPLE
const jwt = require('jwt-simple');
const { DateTime } = require('luxon'); //para hacer el TOKEN (si esta expirado)

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: DateTime.now().toMillis(),
        exp: DateTime.now().plus({ day: 14 }).toMillis()
        };

        return jwt.encode(payload, process.env.SECRET_TOKEN);
};


const decodeToken = async (token) => {

    try{
        const payload = jwt.decode(SECRET_TOKEN);
        if(payload.exp <= DateTime.toMillis()){
            return { status: 401, message: 'The token has expirated' }
        }

        return payload.sub;
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createToken,
    decodeToken
}
