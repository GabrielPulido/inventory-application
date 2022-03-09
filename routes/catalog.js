var express = require('express');
var router = express.Router();

//import controllers
var item_controller = require('../controllers/itemController');
var category_controller = require('../controllers/categoryController');

//view item
router.get('/item/:id', item_controller.view_item);



module.exports = router;