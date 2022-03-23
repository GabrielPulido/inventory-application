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
router.get('/categories', category_controller.categories_list);

//get create category form
router.get('/categories/create', category_controller.category_create_get);

//submit create category form
router.post('/categories/create', category_controller.category_create_post);

//view specific category
router.get('/categories/:id', category_controller.view_category);

//view item
router.get('/item/:id', item_controller.view_item);

module.exports = router;