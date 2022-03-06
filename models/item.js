var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        price: { type: Number, required: true },
        expirationDate: { type: Date },
    }
);

ItemSchema
    .virtual('url')
    .get(function () {
        return '/item/' + this._id;
    });

module.exports = mongoose.model('Item', ItemSchema);