var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');

//categories_list
exports.categories_list = function (req, res, next) {
    Category.find({}).exec(function (err, categories_list) {
        if (err) { return next(err); }
        res.render('category_list', { title: 'Category List', categories_list: categories_list });
    });
}

//view specific category
exports.view_category = function (req, res, next) {
    async.parallel({
        category: function (callback) { Category.findById(req.params.id).exec(callback) },
        items_list: function (callback) { Item.find({ 'category': req.params.id }).exec(callback) },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.category == null) {
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        if (results.items_list == null) {
            var err = new Error('Items not found');
            err.status = 404;
            return next(err);
        }
        res.render('view_category', { title: results.category.name, category: results.category, items_list: results.items_list });
    });
}