const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const coffeeLogo = fs.readFileSync(`${__dirname}/../images/coffeeLogo.png`);
const coffeeLogoHover = fs.readFileSync(`${__dirname}/../images/coffeeLogoHover.png`);
const background = fs.readFileSync(`${__dirname}/../images/background.png`);
const favicon = fs.readFileSync(`${__dirname}/../images/favicon.png`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getLogo = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(coffeeLogo);
    response.end();
};

const getLogoHover = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(coffeeLogoHover);
    response.end();
};

const getBG = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(background);
    response.end();
};

const getFavicon = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.write(favicon);
    response.end();
}; 

module.exports = {
  getIndex,
  getCSS,
  getLogo,
  getLogoHover,
  getBG,
  getFavicon,
};
