const Item = require('../models/Item');

module.exports.get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
};

module.exports.get_items_id = (req,res) => {
    const {id} = req.params;
    console.log(id)
    Item.findById(id).then(item => res.json(item))
};

module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    console.log(newItem);
    newItem.save().then(item => res.json(item));
    // res.json(newItem)
};

module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
};

module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}

module.exports.review = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (item && item.review) {
        item.review = [...item.review, req.body];
    } else {
        item.review = [req.body]
    }

    const response = await Item.updateOne({ _id: id }, item)
    res.json(item);
    res.end();
}