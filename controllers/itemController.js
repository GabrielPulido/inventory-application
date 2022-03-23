var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');

exports.view_item = function (req, res, next) {
    Item.findById(req.params.id)
        .populate('category')
        .exec(function (err, item) {
            if (err) { return next(err); }
            if (item == null) {
                var err = new Error('Item not found');
                err.status = 404;
                return next(err);
            }

            res.render('item_detail', { title: `Item: ${item.name}`, item: item });
        })
}