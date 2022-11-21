const { loginService } = require('./index');
const User = require('../models/users');
const { ObjectId } = require('mongoose');
const Serie = require('../models/series')


const register = (email, password) => { //HECHO
    return new Promise((resolve, reject) => {

        const newUser = new User ({ 
            email,
            password });

        User.findOne({ email: newUser.email }, (err, user) => {
            if(err){
                reject({ status: 500, message: 'There has been an error' })
            }
            if(user){
                reject({ status: 403, message: 'The email has already been used' })
            }
            newUser.save(err => {
                if(err){
                    reject({ status: 500, message: 'There has been an error' })
                }
                resolve({ status: 200, token: loginService.createToken(newUser) })
            })
        })
    });

};

const logIn = (email, password) => {
    return new Promise((resolve, reject) => {
        const User =  User ({ 
            email,
            password });
        
        User.findOne({ email: email }, (err, user) => {
            if(err){
                reject({ status: 500, message: 'There has been an error' })
            }
            if(!user){ 
                return res.status(404).send({ message: 'User or email not found' })
            }
            if(!user || !User.password || !user.comparePassword(User.password)){
                return res.status(401).send({ message: 'Email or password incorrect' })
            }
            resolve({ status: 200, token: loginService.createToken(user) });
        })
    })
}


const addFav = async (id, serieId) => {
    try{
        const userFound = await User.findById(id);
        const serieFound = await Serie.findById(serieId);
        if(!userFound){
            return('User not found')
        }
        if(!serieFound){
            return('Serie not found')
        }
        userFound.favoriteSeries.push(serieFound._id);
        await userFound.save();
    }catch(err){
        throw err;
    }
}

module.exports = {
    register,
    logIn,
    addFav
}