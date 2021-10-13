var http = require("http");
var url = require('url');
const fs = require('fs');
const {Pizza, generateDisplayList} = require('./js/Pizza/AllPizza.js');

// load the kitchen data from JSON
let KitchenData = require('./kitchen_data.json');

/*
const { createCanvas, loadImage } = require('canvas');

const {CanvasRenderer} = require('./render/CanvasRenderer.js');


///////
// Rener-related funcs
var globalTextureDictionary = new Map();
var displayBundle;
var texturesToLoad = 0;

function loadTextures(textureList) {
    // Load the textures
    //textureList.forEach(loadTexture);

    //console.log(textureList);
    for (var i = 0; i < textureList.length; i++)
    {
      var imgIndex = i;
      var imgName = textureList[imgIndex];

        // check global cache first it might already be loaded
        var cachedImage = globalTextureDictionary.get(imgName);
        if (cachedImage == undefined || cachedImage == null)
        {
            texturesToLoad++;
            loadImage(imgName).then(image => {
              //console.log(imgName);
  
              globalTextureDictionary.set(imgName, image);
              texturesToLoad--;

              renderWhenReady();
            });

        }        
    }
}

function renderWhenReady() {

    if (texturesToLoad == 0)
        render(displayBundle);
}


async function NEWLoadTexturesAndRender(displayBundle, dna)
{
  var textureList = displayBundle.textureList;

  // stack of loadImage promises, then finally render
  for (var i = 0; i < textureList.length; i++)
  {
    var imgIndex = i;
    var imgName = textureList[imgIndex];

    // check global cache first it might already be loaded
    var cachedImage = globalTextureDictionary.get(imgName);
    if (cachedImage == undefined || cachedImage == null)
    {
      await loadImage(imgName).then(image => {
        //console.log(imgName);
        globalTextureDictionary.set(imgName, image);
      });
    }
  }

  render(displayBundle, dna);
}

function render(displayBundle, dna)
{
  const width = 1024;
  const height = 1024;
  const canvas = createCanvas(width, height);

  var renderer = new CanvasRenderer();
  renderer.renderToCanvas(canvas, displayBundle, globalTextureDictionary);

  // write to file
  const buffer = canvas.toBuffer('image/png')
  var filename = "./" + dna + ".png";
  fs.writeFileSync(filename, buffer)
}
*/
///////

http.createServer(function(request, response) {

  // ignore the favicon request
  if (request.url != '/favicon.ico') 
  {
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

        // generate marketing data
        ret.ingredientsData = pizza.generateIngredientsData(KitchenData);
        ret.pizzaProbability = pizza.calculatePizzaProbability(ret.ingredientsData);   
        ret.description = pizza.generatePizzaDescription(ret.ingredientsData);
/*
        // render pizza image, save image, save JSON
        // TODO: add saved image URL to json before saving
        if (false)
        {
          // render and save pizza image
          // TODO: also would want to save the JSON
          NEWLoadTexturesAndRender(ret.displayBundle, ret.dna);
          // done RENDERING pizza image

          // write out JSON file if desired
          let json = JSON.stringify(ret);
          fs.writeFileSync(ret.dna + '.json', json);
        }
 */       
      }


      // output json
      response.end(JSON.stringify(ret));
    }
  }).listen(80);
  