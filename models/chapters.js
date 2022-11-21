const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chapterSchema = new Schema ({
    
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    fromSerie: { type: Schema.Types.ObjectId, ref: 'Serie' }
})

module.exports = mongoose.model('Chapter', chapterSchema);