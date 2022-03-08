#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item');
var Category = require('./models/category');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function itemCreate(name, description, category, price, expirationDate, cb) {
    let itemDetails = { name: name, category: category, price: price };
    if (description != false) itemDetails.description = description;
    if (expirationDate != false) itemDetails.expirationDate = expirationDate;

    var item = new Item(itemDetails);

    item.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Item: ' + item);
        items.push(item);
        cb(null, item);
    });
}

function categoryCreate(name, description, cb) {
    let categoryDetails = { name: name };
    if (description != false) categoryDetails.description = description;

    var category = new Category(categoryDetails);

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function createCategories(cb) {
    async.series([
        function (callback) {
            categoryCreate('Dairy', 'Dairy Description...', callback);
        },
        function (callback) {
            categoryCreate('Meat', 'Meat Description...', callback);
        },
        function (callback) {
            categoryCreate('Snacks', 'Snacks Description...', callback);
        },
        function (callback) {
            categoryCreate('Drinks', 'Drinks Description...', callback);
        },
        function (callback) {
            categoryCreate('Bakery', 'Bakery Description...', callback);
        },
        function (callback) {
            categoryCreate('Produce', 'Produce Description...', callback);
        },
    ], cb);
}

function createItems(cb) {
    async.series([
        function (callback) {
            itemCreate('Milk', 'Milk Description...', categories[0], 2.50, new Date(2022, 4, 1), callback);
        },
        function (callback) {
            itemCreate('Chicken', 'Chicken Description...', categories[1], 8.47, new Date(2022, 7, 16), callback);
        },
        function (callback) {
            itemCreate('Sour Patch', 'Sour Patch Description...', categories[2], 1.99, new Date(2025, 2, 23), callback);
        },
        function (callback) {
            itemCreate('Coca-Cola', 'Coca-Cola Description...', categories[3], 9.99, new Date(2023, 11, 2), callback);
        },
        function (callback) {
            itemCreate('Brownies', 'Brownies Description...', categories[4], 5.32, new Date(2022, 5, 20), callback);
        },
        function (callback) {
            itemCreate('Carrots', 'Carrots Description...', categories[5], 1.50, new Date(2022, 3, 15), callback);
        },
    ], cb);
}

async.series([
    createCategories,
    createItems
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Done: ');

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });