var Item = require('../models/item');
var Category = require('../models/category');

var async = require('async');
const { body, validationResult } = require('express-validator');
let utility = require('../utility');
const { findById } = require('../models/category');

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
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Category name is required.'),
    body('description', 'Invalid category description').optional({ checkFalsy: true }).escape(),

    async function (req, res, next) {
        const errors = validationResult(req);

        //passes in req.body as category which always has a .name and a .description
        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Create New Category: ', errors: errors.array(), category: req.body });
        }

        const formatted_category_name = utility.formatName(req.body.name);

        let duplicate = await Category.findOne({ 'name': formatted_category_name });

        //if there's a duplicate...
        if (duplicate != null) {
            const errors = [{ msg: 'Duplicate category. Please make a new category.' }];
            res.render('category_form', { title: 'Create New Category: ', errors: errors.array() });
        }
        //if there isn't...
        else {
            let category = new Category(
                {
                    name: formatted_category_name,
                    description: req.body.description,
                });

            await category.save();
            res.redirect(category.url);
        }
    }
];

exports.category_delete_get = async function (req, res, next) {
    let category = await Category.findById(req.params.id);
    res.render('category_delete', { title: `Delete Category: ${category.name}`, category: category });
}

/* 
Note: even though category._id is the actual objectID and req.body.categoryid is the string form of the id, we can use both of them to find/delete specific items bc it's smart enough to find based on the string form or objectID form
*/
//User submits category delete form
exports.category_delete_post = async function (req, res, next) {
    const category = await Category.findById(req.body.categoryid);
    await Item.deleteMany({ category: category._id });
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect('/categories');
};


//get update category form
exports.category_update_get = async function (req, res, next) {
    const category = await Category.findById(req.params.id);
    res.render('category_form', { title: `Update Category: ${category.name}`, category: category });
}

exports.category_update_post = [
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Category name is required.'),
    body('description', 'Invalid category description').optional({ checkFalsy: true }).escape(),
    async function (req, res, next) {
        const errors = validationResult(req);
        const category = await Category.findById(req.params.id);

        //passes in req.body as category which always has a .name and a .description
        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Update Category: ' + category.name, errors: errors.array(), category: req.body });
        }
        else {
            const updatedCategory = new Category(
                {
                    name: req.body.name,
                    description: req.body.description,
                    _id: req.params.id,
                }
            )
            await Category.findByIdAndUpdate(req.params.id, updatedCategory);
            res.redirect(category.url);
        }
    }
]