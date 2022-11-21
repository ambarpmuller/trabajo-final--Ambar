const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const serieSchema = new Schema ({

    title: { type: String, unique: true, required: true},
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    quantityOfChapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    userFav: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Serie', serieSchema);


