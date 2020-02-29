/*
Author: Zach Brown
Course: IGME-430
Project: #1 API Powered App
File: jsonResponses.js
*/

//const users = {};
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

// get users response
/* const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
    // 200 status code success
  respondJSON(request, response, 200, responseJSON);
};

// get users meta
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// function which adds a user
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // update name and age of user
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // return the appropriate response code
  return respondJSONMeta(request, response, responseCode);
};
*/

//get information from coffeeList
const getCoffee = (request, response) => {
  const responseJSON = {
    coffee,
  };
    // 200 status code success
  respondJSON(request, response, 200, responseJSON);
};

const getCoffeeMeta = (request, response) => { 
    respondJSONMeta(request, response, 200);
}
                                            
const getCoffeeData = (request, response) => {
    const responseJSON = {
        coffeeData,
    };
    respondJSON(request, response, 200, responseJSON);
}

//add a coffee drink to the list
const addCoffee = (request, response, body) => {
    const responseJSON = {
        message: 'Please fill out all fields.',
    };
    //check for missing fields

  if (!body.name || !body.shop || !body.description || !body.price || !body.rating) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
    
  let coffeeList = 0;
  for(let x = 0; x < coffee)

  if (responseCode === 204) {
    coffee[coffeeList].name = body.name;
    coffee[coffeeList].shop = body.shop;
    coffee[coffeeList].description = body.description;
    coffee[coffeeList].price = body.price;
    coffee[coffeeList].rating = body.rating;
  }  
  // return the appropriate response code
  return respondJSONMeta(request, response, responseCode);
  }

coffee.push({
    name: body.name,
    shop: body.shop,
    description: body.description,
    price: body.price,
    rating: body.rating,
});

responseJSON.message = 'Added coffee to the database!';
    return respondJSON(request, response, responseCode, responseJSON);


  if (responseCode === 201) {
    responseJSON.message = 'Added coffee to the database!';
    return respondJSON(request, response, responseCode, responseJSON);
  }
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



//module exports
module.exports = {
  getCoffee,
  getCoffeeMeta,
  getCoffeeData,
  addCoffee,
  notFound,
  notFoundMeta,

};
