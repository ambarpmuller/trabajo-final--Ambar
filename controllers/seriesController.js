// const Serie = require('../models/series');
const series = require('../models/series');
const { serieService } = require('../services/serieIndex')

const addSerie = async (req, res) => {
    try{
        const { title, description, img, category } = req.body;
        console.log(title, category);
        const newSerie = await serieService.addSerie(title, description,img, category);
        res.status(200).send({ message: 'You have succesfully added a new serie!', newSerie });
    }catch(err){
        res.status(500).send(err);
    }
}


const getSerie = async (req, res) => {
let series;
     try{
        series = await serieService.getSerie();
         res.status(200).send(series)
     }catch(err){
         res.status(500).send(err);
     }
     
}

const getData = async (req, res) => {
    
     try{
         const { id } = req.body;
         const serie = await serieService.getData(id);
         res.status(200).send(serie);
     }catch(err){
         res.status(500).send(err);
     }

}

const deleteSerie = async (req, res) => {
    const { id } = req.body;
    try{
        const deletedSerie = await serieService.deleteSerie(id);
        res.status(200).send({ message: "The serie has been corectly deleted", deletedSerie});
    }catch(error){
        res.status(500).send(error);
    }
    
}

const updateSerie = async (req, res) => {
    const { id, title, description, img, category } = req.body;
    try{
        const updatedSerie = await serieService.updateSerie(id, title, description, img, category );
        res.status(200).send({ message: "The serie has been successfully updated", updatedSerie});
    }catch(error){
        res.status(500).send(error);
    }
   
}


module.exports = {
    getSerie,
    getData,
    deleteSerie,
    updateSerie,
    addSerie
}