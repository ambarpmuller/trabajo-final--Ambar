const express = require('express');
const routes = express.Router();

//import controllers
const { 
    usersController
} = require('../controllers/index');

const { 
    seriesController
} = require('../controllers/seriesIndex');

const { 
    chaptersController
} = require('../controllers/chapterIndex');


//user schemas
 const {
     userSchema
} = require('../controllers/schemas/index')


// USER ROUTES
routes.post("/signin", userSchema, usersController.login);
routes.post('/signup', userSchema, usersController.register);
routes.post('/addfav', usersController.addFavorite)

// SERIES ROUTES
routes.post('/addserie', seriesController.addSerie);
routes.get('/getseries', seriesController.getSerie);
routes.get('/getdata', seriesController.getData);
routes.delete('/deleteserie', seriesController.deleteSerie);
routes.put('/updateserie', seriesController.updateSerie);


// //CHAPTER CONTROLLER
routes.post('/addchapter', chaptersController.addChapter);
routes.get('/getchapter', chaptersController.getChapter);
routes.delete('/deletechapter', chaptersController.deleteChapter);
routes.put('/updatechapter', chaptersController.updateChapter);


module.exports = routes;