var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');

exports.view_categories = function (req, res, next) {
    Category.find({}).exec(function (err, categories_list) {
        if (err) { return next(err); }
        res.render('category_list', { title: 'Category List', categories_list: categories_list });
    });
}