const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
);

module.exports = Review = mongoose.model('review', ReviewSchema);