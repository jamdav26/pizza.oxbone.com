var http = require("http");
var url = require('url');

const {KitchenData, Pizza, generateDisplayList} = require('./js/Pizza/AllPizza.js');

http.createServer(function(request, response) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        
        "Content-Type": "application/json",
      };

    response.writeHead(200, headers);

    // return object (jsonified)
    var ret = {};

    // make pizza
    // TODO: this might be passed into the URL,so need need to generate
    var pizza = new Pizza();
    pizza.makeRandom({}, KitchenData);
    ret.dna = pizza.dna;

    // generate display list
    ret.displayBundle = generateDisplayList(pizza, KitchenData);

    // output json
    response.end(JSON.stringify(ret));
  }).listen(80);
  