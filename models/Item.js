const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image01: {
        type: String,
        required: true
    },
    review: []
},
    {
        timestamps: true
    }
);

module.exports = Item = mongoose.model('item', ItemSchema);