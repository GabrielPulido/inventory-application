console.log('adding my data');

//instead of having to put the url into the command, hardcode it instead. to run this file just write 'node addItems.js'

//import models
let Item = require('./models/item');
let Category = require('./models/category');

//connect to db
let mongoose = require('mongoose');
let mongoDB = 'mongodb+srv://gabep:ia-admin@cluster0.itbj1.mongodb.net/inventory-app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let items = [];
let categories = [];

//generates random date
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//generates random price between 0-20.00
function randomPrice() {
    return Math.random() * 20;
}

function buildDescription(str) {
    return `${str} Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam quam. Est ultricies integer quis auctor. Vitae auctor eu augue ut lectus. Sodales ut eu sem integer. Amet tellus cras adipiscing enim. Tellus molestie nunc non blandit massa enim. Quisque id diam vel quam elementum pulvinar. Netus et malesuada fames ac turpis egestas integer eget aliquet. Quam quisque id diam vel quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Libero volutpat sed cras ornare arcu dui. Pulvinar etiam non quam lacus suspendisse faucibus. Et malesuada fames ac turpis egestas integer eget aliquet. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa tempor nec feugiat nisl pretium.`
}

//generic callback
function genericCB() { }

async function itemCreate(name, description, categoryName, price, expirationDate) {

    //find category based on inputted name
    let category = await Category.findOne({ 'name': categoryName });

    //Create item object
    let itemDetails = { name: name, category: category, price: price };
    if (description != false) itemDetails.description = description;
    if (expirationDate != false) itemDetails.expirationDate = expirationDate;

    let item = new Item(itemDetails);

    //save to db
    try {
        await item.save();
        console.log("Inserted " + item.name + " into database");

    }
    catch (error) {
        console.error(error);
    }
}

/*
 - Takes in 6 item names
 - order matters
 - generates random price between 0-20 and random exp date between now and 2024
*/
async function createItems(dairyItem, meatItem, snackItem, drinkItem, bakeryItem, produceItem) {
    await itemCreate(
        dairyItem,
        buildDescription(dairyItem),
        'Dairy',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1))
    );

    await itemCreate(
        meatItem,
        buildDescription(meatItem),
        'Meat',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1)));

    await itemCreate(
        snackItem,
        buildDescription(snackItem),
        'Snacks',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1)));

    await itemCreate(
        drinkItem,
        buildDescription(drinkItem),
        'Drinks',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1)));

    await itemCreate(
        bakeryItem,
        buildDescription(bakeryItem),
        'Bakery',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1)));

    await itemCreate(
        produceItem,
        buildDescription(produceItem),
        'Produce',
        randomPrice(),
        randomDate(new Date(), new Date(2024, 0, 1)));

    mongoose.connection.close();
}

createItems('Cheese', 'Bacon', 'Twinkies', 'Water', 'Cookies', 'Pineapples');