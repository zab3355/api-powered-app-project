/*
Author: Zach Brown
Course: IGME-430
Project: #1 API Powered App
File: server.js
*/

const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// url Struct with GET and HEAD Request + respective handlers
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getCoffee': jsonHandler.getCoffee,
    '/coffeeData': jsonHandler.getCoffeeData,
    '/getLogo': htmlHandler.getLogo,
    '/getLogoHover': htmlHandler.getLogoHover,
    '/getBG': htmlHandler.getBG,
    '/getFavicon': htmlHandler.getFavicon,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getCoffee': jsonHandler.getCoffeeMeta, 
    notFound: jsonHandler.notFoundMeta,
  },
};

// getHandle function connects handlers
const getHandle = (request, response, parsedUrl) => {
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

// postHandle sends
const postHandle = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addCoffee') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });


    request.on('data', (chunk) => {
      body.push(chunk);
    });


    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addCoffee(request, res, bodyParams);
    });
  }
};

// onRequest function which parses the URL and sets/gets data
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'POST') {
    postHandle(request, response, parsedUrl);
  } else {
    getHandle(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
