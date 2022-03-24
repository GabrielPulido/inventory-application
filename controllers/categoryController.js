var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');
let utility = require('../utility');

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

//get the create category form
exports.category_create_get = async function (req, res, next) {
    res.render('category_form', { title: 'Create New Category: ' });
}

//submit create category form 
exports.category_create_post = [
    body('category_name').trim().isLength({ min: 1 }).escape().withMessage('Category name is required.'),
    body('category_description', 'Invalid category description').optional({ checkFalsy: true }).escape(),

    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Create New Category: ', errors: errors.array(), prevCategory: req.body })
        }

        const formatted_category_name = utility.formatName(req.body.category_name);

        let duplicate = await Category.findOne({ 'name': formatted_category_name });

        //if there's a duplicate...
        if (duplicate != null) {
            res.render('category_form', { title: 'Create New Category: ', errors: [{ msg: 'Duplicate category. Please make a new category.' }] })
        }
        //if there isn't...
        else {
            let category = new Category(
                {
                    name: formatted_category_name,
                    description: req.body.category_description,
                });

            await category.save();
            res.redirect(category.url);
        }
    }
];