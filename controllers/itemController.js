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

//get create item form
exports.item_create_get = async function (req, res, next) {
    let categories = await Category.find();

    //create blank item
    let blankItem = {}
    blankItem.category = {};
    blankItem.category._id = '';

    res.render('item_form.pug', { title: 'Create Item: ', categories: categories, item: blankItem });
}

//submit create item form
exports.item_create_post = [
    body('name').trim().isLength({ min: 1 }).escape().withMessage('name is required'),
    body('description', 'Invalid description').trim().escape().optional({ checkFalsy: true }),
    body('category', 'category must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price').trim().escape().isLength({ min: 1 }).withMessage('price is required').isNumeric().withMessage('make sure price is numeric'),
    body('exp_date', 'Invalid Exp Date').optional({ checkFalsy: true }).isISO8601().toDate(),

    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let categories = await Category.find();
            //create blank item
            let blankItem = {}
            blankItem.category = {};
            blankItem.category._id = '';
            res.render('item_form.pug', { title: 'Create Item: ', categories: categories, errors: errors.array(), item: blankItem });
        }

        else {

            let category = await Category.findOne({ name: req.body.category });
            let item = new Item(
                {
                    name: req.body.name,
                    description: req.body.description,
                    category: category,
                    price: req.body.price,
                    expirationDate: req.body.exp_date
                }
            );

            await item.save();
            res.redirect(item.url);
        }
    }
];

//get item delete form
exports.item_delete_get = async function (req, res, next) {
    const item = await Item.findById(req.params.id);
    res.render('item_delete.pug', { title: `Delete Item ${item.name}`, item: item });
}


//submit item delete form
/*
the findByIdAndDelete command returns the item you deleted from the database so I used that to make the header of the page
*/
exports.item_delete_post = async function (req, res, next) {
    const item = await Item.findByIdAndDelete(req.body.itemid);
    res.render('item_delete_confirmation.pug', { title: `${item.name} Successfully Deleted` });
}


//get item update form
exports.item_update_get = async function (req, res, next) {
    const item = await Item.findById(req.params.id);
    const categories = await Category.find();
    res.render('item_form.pug', { title: `Update Item: ${item.name}`, item: item, categories: categories });
}

//submit item update form
exports.item_update_post = [
    body('name').trim().isLength({ min: 1 }).escape().withMessage('name is required'),
    body('description', 'Invalid description').trim().escape().optional({ checkFalsy: true }),
    body('category', 'category must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price').trim().escape().isLength({ min: 1 }).withMessage('price is required').isNumeric().withMessage('make sure price is numeric'),
    body('exp_date', 'Invalid Exp Date').optional({ checkFalsy: true }).isISO8601().toDate(),

    async function (req, res, next) {
        const errors = validationResult(req);
        let oldItem = await Item.findById(req.params.id);

        if (!errors.isEmpty()) {
            let categories = await Category.find();
            res.render('item_form.pug', { title: `Update Item: ${oldItem.name}`, item: oldItem, categories: categories, errors: errors.array() });
        }
        else {
            const category = await Category.findOne({ name: req.body.category });
            let item = new Item(
                {
                    name: req.body.name,
                    description: req.body.description,
                    category: category,
                    price: req.body.price,
                    expirationDate: req.body.exp_date,
                    _id: req.params.id
                }
            );

            await Item.findByIdAndUpdate(req.params.id, item);
            res.redirect(item.url);
        }

    }
];