const Chapter = require('../models/chapters')
const { ObjectId } = require('mongoose');
const Serie = require('../models/series');

const addChapter = async (title, description, url, fromSerie) => {
        
        try{
            const serieFound = await Serie.findById(fromSerie);
            if(!serieFound){
                return('The serie was not found');
            };
            const newChapter = new Chapter({ title, description, url, fromSerie })
            await newChapter.save();
            serieFound.quantityOfChapters.push(newChapter._id);
            await serieFound.save();
        }catch(err){
            console.log(err);
            throw err;
        }
}

const getChapter = async (serieId) => {
    try{
        const chapterFound = await Serie.findById(serieId);
        if(!chapterFound){
            return('The serie was not found');
        };
        return chapterFound.quantityOfChapters;
    }catch(err){
        console.log(err);
        throw err;
        }
}
 

const deleteChapter = (id) => {
    return new Promise((resolve, reject) => {
        Chapter.findByIdAndRemove(id, (err, result) => {
            if(err){
                reject(err);
            } else if (!result){
                reject("The logged ID does not exist")
            }
            resolve(result);
        });
    });
}

const updateChapter = (id, title, description, url) => {
    return new Promise((resolve, reject) => {
        Chapter.findByIdAndUpdate({ _id: id }, { title, description, url }, (err, result) => {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    addChapter,
    getChapter,
    deleteChapter,
    updateChapter
}