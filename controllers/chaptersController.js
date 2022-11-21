const { chapterService } = require('../services/chapterIndex')

const getChapter = async (req, res) => {
    try{
        const { serieId } = req.body
        const chapters = await chapterService.getChapter(serieId);
        res.status(200).send(chapters);
    }catch(error){
        res.status(500).send(error);
    }
}
const addChapter = async (req, res) => {
    try{
        const { title, description, url, fromSerie} = req.body;
        console.log(title, fromSerie);
        const newChapter = await chapterService.addChapter(title, description, url, fromSerie);
        res.status(200).send({ message: 'You have succesfully added a new chapter!', newChapter });
    }catch(err){
        res.status(500).send(err);
    }
}
const deleteChapter = async (req, res) => {
    const { id } = req.body;
    try{
        const deletedChapter = await chapterService.deleteChapter(id);
        res.status(200).send({ message: "The chapterhas been corectly deleted", deletedChapter});
    }catch(error){
        res.status(500).send(error);
    }
}
const updateChapter = async (req, res) => {
    const { id, title, description, url } = req.body;
    try{
        const updatedChapter = await chapterService.updateChapter(id, title, description, url );
        res.status(200).send({ message: "The chapter has been successfully updated", updatedChapter});
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    addChapter,
    getChapter,
    updateChapter,
    deleteChapter
}
