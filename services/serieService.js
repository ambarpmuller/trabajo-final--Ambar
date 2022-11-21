const Serie = require('../models/series');
const { ObjectId } = require('mongoose');


const addSerie = async (title, description, img, category) => {

        try{
            const newSerie = new Serie({ title, description, img, category })
            await newSerie.save();
        }catch(err){
            console.log(err);
            throw err;
        }
    
    }


const getSerie = async () => {
    try{
        const serie = await Serie.find();
        if(!serie){
            return('There are not any series to show');
        };
        return serie;
    }catch(err){
        console.log(err);
        throw err;
        }
}

const getData = async (id) => {
    try{
        const serie = await Serie.findById(id);
        if(!serie){
            return('The serie was not found');
        };
        return serie;
    }catch(err){
        console.log(err);
        throw err;
        }
}


const updateSerie = (id, title, description, img, category) => {
    return new Promise((resolve, reject) => {
        Serie.findByIdAndUpdate({ _id: id }, { title, description, img, category }, (err, result) => {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const deleteSerie = (id) => {
    return new Promise((resolve, reject) => {
        Serie.findByIdAndRemove(id, (err, result) => {
            if(err){
                reject(err);
            } else if (!result){
                reject("The loggd ID does not exist");
            }
            resolve(result);
        });
    });
}


module.exports = {
    addSerie,
    getSerie, 
    getData,
    updateSerie,
    deleteSerie
}