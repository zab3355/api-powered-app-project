/*
Author: Zach Brown
Course: IGME-430
Project: #1 API Powered App
File: jsonResponses.js

JSON File Source: https://github.com/CoffeeJson/json
*/

// const users = {};
const coffee = [];
const coffeeData = require('./coffeeList.json');

// respondJSON response
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// respond JSON Meta response
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

// get information from coffeeList
const getCoffee = (request, response) => {
  const responseJSON = {
    coffee,
  };
  // 200 status code success
  respondJSON(request, response, 200, responseJSON);
};

const getCoffeeMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const getCoffeeData = (request, response) => {
  const responseJSON = {
    coffeeData,
  };
  respondJSON(request, response, 200, responseJSON);
};

const getCoffeeDataMeta = (request, response) => respondJSONMeta(request, response, 200);

// add a coffee drink to the list
const addCoffee = (request, response, body) => {
  const responseJSON = {
    message: 'Please fill out all fields.',
  };

  // check for missing fields
  if (!body.name || !body.shop || !body.description) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }
  
  //continuation to check for missing fields
  else if (!body.coffeetype || !body.price || !body.rating){
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  //Checks if update is required by searching if the data exists
  let coffeeList = 0;
  for (let x = 0; x < coffee.length; x++) {
    if (coffee[x] === body.name && coffee[x].shop === body.shop) {
      responseCode = 204;
      coffeeList = x;
      break;
    }
  }

  //updates JSON data if data is modified
  if (responseCode === 204) {
    coffee[coffeeList].name = body.name;
    coffee[coffeeList].shop = body.shop;
    coffee[coffeeList].coffeetype = body.coffeetype;
    coffee[coffeeList].description = body.description;
    coffee[coffeeList].price = body.price;
    coffee[coffeeList].rating = body.rating;

    // return the appropriate response code
    return respondJSONMeta(request, response, responseCode);
  }

  //data gets pushed into new object
  coffee.push({
    name: body.name,
    shop: body.shop,
    coffeetype: body.coffeetype,
    description: body.description,
    price: body.price,
    rating: body.rating,
  });

  //response lets user know something is added to view responses
  responseJSON.message = 'Added coffee to the database!';
  return respondJSON(request, response, responseCode, responseJSON);
};

// not found response
const notFound = (request, response) => {
  const responseJSON = {
    message: 'Resource Not Found',
    id: notFound,
  };
  // 404 is returned
  respondJSON(request, response, 404, responseJSON);
};

// not found meta
const notFoundMeta = (request, response) => {
  // 404 is returned
  respondJSONMeta(request, response, 404);
};


// module exports
module.exports = {
  getCoffee,
  getCoffeeMeta,
  getCoffeeData,
  getCoffeeDataMeta,
  addCoffee,
  notFound,
  notFoundMeta,
};
