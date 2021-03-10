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

    var q = url.parse(request.url, true);
    var qdata = q.query; 
    var dna = qdata.dna;

    // make pizza
    var pizza = new Pizza();
    if (dna == null || dna == undefined)
      pizza.makeRandom({}, KitchenData);
    else
      pizza.makeFromDna(dna);  

    if (pizza.dna == null || pizza.dna == undefined || pizza.dna == false)
    {
      ret = {error: "illegal dna."};
    } 
    else {

      ret.dna = pizza.dna;

      // generate display list
      ret.displayBundle = generateDisplayList(pizza, KitchenData);
    }

    // output json
    response.end(JSON.stringify(ret));
  }).listen(80);
  