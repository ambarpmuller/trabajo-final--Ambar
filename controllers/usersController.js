const { loginService } = require('../services/index');
const { userService } = require('../services/userIndex');
const { validationResult } = require('express-validator');
const User = require('../models/users')


const login = async (req, res) => {

    const email = req.body.email;

    if(!email){
       return res.status(400).send({ message: 'An email is required to log in' })
    }

    User.findOne({ email: email }, (err, user) => {
       
        if(err){
            return res.status(500).send({ message: 'There was an error', err })
        }
        if(!user){
            return res.status(404).send({ message: 'User or email not found' })
        }
        if(!user || !req.body.password || !user.comparePassword(req.body.password)){
            return res.status(401).send({ message: 'Email or password incorrect' })
        }

        req.user = user;
        res.status(200).send({ message: 'You have succesfully logged in!', token: loginService.createToken(user)}) 
    })

}

const register = async (req, res) => {
    try{
         const resultValidationReq = validationResult(req);
         const hasErrors = !resultValidationReq.isEmpty();
        const { email, password } = req.body;

         if(hasErrors){
          return res.status(400).send(resultValidationReq);
        }

        const result = await userService.register(email, password).catch(err => err);
        res.status(result.status).send(result.message);
    }catch(err){
        res.status(500).send(err);
    }   
}
 

const addFavorite = async (req, res) => {
    try{
        const { id, serieId } = req.body;
        const newFav = await userService.addFav(id, serieId);
        res.status(200).send({ message: 'You have succesfully added a new favorite serie!', newFav });
    }catch(err){
        res.status(500).send(err);
    }
}


module.exports = {
    login, 
    register,
    addFavorite
}