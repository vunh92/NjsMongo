const mongoose = require('mongoose');
// viết schema
const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true,
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: Date
})

module.exports = mongoose.model('Movie', movieSchema);