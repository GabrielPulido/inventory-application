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

//get create item form
router.get('/items/create', item_controller.item_create_get);

//submit create item form
router.post('/items/create', item_controller.item_create_post);

//view specific category
router.get('/categories/:id', category_controller.view_category);

//view item
router.get('/item/:id', item_controller.view_item);

//get category delete form
router.get('/categories/:id/delete', category_controller.category_delete_get);

//submit category delete form
router.post('/categories/:id/delete', category_controller.category_delete_post);

//get item delete form
router.get('/item/:id/delete', item_controller.item_delete_get);

//submit item delete form
router.post('/item/:id/delete', item_controller.item_delete_post);

//get item update form
router.get('/item/:id/update', item_controller.item_update_get);

//submit item update form
router.post('/item/:id/update', item_controller.item_update_post);

//get update category form
router.get('/categories/:id/update', category_controller.category_update_get);

//submit update category form
router.post('/categories/:id/update', category_controller.category_update_post);

module.exports = router;