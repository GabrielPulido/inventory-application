var express = require('express');
var router = express.Router();

//import controllers
var item_controller = require('../controllers/itemController');
var category_controller = require('../controllers/categoryController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Grocery Store' });
});

//view category list
router.get('/categories', category_controller.view_categories);

//view specific category
router.get('/categories/:id', category_controller.view_category);

//view item
//router.get('/item/:id', item_controller.view_item);

module.exports = router;