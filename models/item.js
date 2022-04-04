var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const { DateTime } = require("luxon");


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

ItemSchema
    .virtual('roundedPrice')
    .get(function () {
        return Math.round(this.price * 100) / 100

    });

ItemSchema
    .virtual('formattedExpDate')
    .get(function () {
        return DateTime.fromJSDate(this.expirationDate).toLocaleString(DateTime.DATE_MED);
    });

ItemSchema.virtual('exp_date_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.expirationDate).toISODate(); //format 'YYYY-MM-DD'
});

module.exports = mongoose.model('Item', ItemSchema);