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
            categoryCreate('Dairy', 'Dairy Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
        function (callback) {
            categoryCreate('Meat', 'Meat Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
        function (callback) {
            categoryCreate('Snacks', 'Snacks Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
        function (callback) {
            categoryCreate('Drinks', 'Drinks Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
        function (callback) {
            categoryCreate('Bakery', 'Bakery Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
        function (callback) {
            categoryCreate('Produce', 'Produce Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', callback);
        },
    ], cb);
}

function createItems(cb) {
    async.series([
        function (callback) {
            itemCreate('Ice Cream', 'Ice Cream Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[0], 4.98, new Date(2023, 4, 1), callback);
        },
        function (callback) {
            itemCreate('Steak', 'Steak Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[1], 19.99, new Date(2022, 5, 26), callback);
        },
        function (callback) {
            itemCreate('Doritos', 'Doritos Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[2], 1.85, new Date(2025, 2, 2), callback);
        },
        function (callback) {
            itemCreate('Fruit Punch', 'Fruit Punch Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[3], 2.59, new Date(2023, 11, 3), callback);
        },
        function (callback) {
            itemCreate('Muffins', 'Muffins Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[4], 5.31, new Date(2022, 5, 21), callback);
        },
        function (callback) {
            itemCreate('Peach', 'Peach Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.', categories[5], 1.49, new Date(2022, 4, 12), callback);
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