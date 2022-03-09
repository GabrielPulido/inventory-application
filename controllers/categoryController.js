var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');
const router = require('../routes/catalog');

exports.view_categories = function (req, res, next) {
    Category.find({}).exec(function (err, list_categories) {
        if (err) { return next(err); }
        res.render('category_list', { title: 'Category List' });
    });
}