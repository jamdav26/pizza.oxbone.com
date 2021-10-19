const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


// HACK! for now load it from the hand-made object
//const {KitchenData, HACK_prepKitchenData} = require('./js/Pizza/KitchenData.js');

const {HACK_prepKitchenData} = require('./js/Pizza/KitchenData.js');

// TODO: iterate folder of ingredients and build the KitchenData object from scratch
var KitchenData = {};

// Rules
KitchenData.Rules = { 
    MAX_TOPPINGS_PER_PIZZA: 10,
    MAX_CHEESES_PER_PIZZA: 1,
    RADIUS_OF_TOPPINGS_WITHIN_CRUST: 0.4,       // TODO: get this from Anthony/art specs
};

// Scatter Methods
KitchenData.ScatterMethods = [
    {name: "Random", rarityLevel: 1},
    {name: "Spiral", rarityLevel: 4},
    {name: "Face", rarityLevel: 6},  
    {name: "Spokes", rarityLevel: 5},     
    {name: "Concentric Circles", rarityLevel: 5}, 
    {name: "Grid", rarityLevel: 3},                     
];

// TODO: get these by iterating the files in the ingredients-db folder
// Boxes
// Papers
// Crusts
// Sauces
// Cheeses
// Toppings

// function to check tokens array to see if any match a string
function isA(tokens, str) 
{
    for (const i in tokens)
    {
        if (tokens[i] == str)
            return true;
    }
    return false;
}


function AddBox(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{
    if (kd.Boxes == undefined)
        kd.Boxes = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [0,0]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Boxes.push(entry);
}

function AddPaper(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{
    if (kd.Papers == undefined)
        kd.Papers = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [0,0]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Papers.push(entry);
}

function AddCrust(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{
    if (kd.Crusts == undefined)
        kd.Crusts = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Crusts.push(entry);
}

function AddSauce(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{
    if (kd.Sauces == undefined)
        kd.Sauces = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Sauces.push(entry);
}

function AddCheese(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{
    if (kd.Cheeses == undefined)
        kd.Cheeses = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Cheeses.push(entry);
}

function AddTopping(fullPath, name, minScale, maxScale, minPer, maxPer, kd)
{ 
    if (kd.Toppings == undefined)
        kd.Toppings = new Array();

    var entry = {
    //    name: "Pepperoni",
        rarityLevel: 1,
    //    imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/4000-topping-meat-pepperoni.png"],
        sizeMinMax: [minScale, maxScale],
        countMinMax: [minPer, maxPer],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Toppings.push(entry);
}

// local foldername of images which should match the images deployed to website
const ingredients_folder_name = "../oxbone.com/Pizza/images/ingredients4"


// read the ingredientsDB CSV file here

fs.createReadStream('ingredients-db_2021_10_18.csv')
  .pipe(csv())
  .on('data', (row) => {
  //  console.log(row);

/*
// each row looks like this:
{
  unique_id: '9410',
  category: 'omakase-kaleprotein',
  topping: 'squid',
  filename_paste: '9410-omakase-kaleprotein-squid',
  on_disk: 'Y',
  img_size: '#N/A',
  inches: '3',
  scale_factor: '0.5',
  inch_variance: '0.2',
  min_per: '5',
  max_per: '19',
  'variant rarity': '',
  'topping rarity': '',
  scatters: '',
  description: '',
  mark_end: '.'
}
*/
    const filename_base = row["filename_paste"];
    //console.log(filename_base);

     // see if this file exists 
    var filename_full = filename_base;
    // append .png 
    filename_full += ".png";
    filename_full = ingredients_folder_name + "/" + filename_full;

    // get scale
    var scale = parseFloat(row["inches"]) / 18.0;
    // correct for NaN
    if (isNaN(scale) == true)
        scale = 0.1;
    // TOOD: for now minScale = maxScale
    var minScale = scale;
    var maxScale = scale;

    // get min/max instance count
    var minPer = parseInt(row["min_per"]);
    var maxPer = parseInt(row["max_per"]);
    // correct for NaN
    if (isNaN(minPer) == true)
        minPer = 10;
    if (isNaN(maxPer) == true)
        maxPer = 20;

    // get category
    var category = row["category"].toLowerCase();

    // get name
    var niceName = row["topping"];

    // TODO: rarity. for now all will have same rarity

    // debug out 
    //console.log(filename_full + ". scale: " + scale + ". minPer: " + minPer + ". maxPer: " + maxPer);


    // see if this file exists
    if (fs.existsSync(filename_full) == true)
    {
      //  console.log(filename_full + " exists");

      var fullPath = "https://www.oxbone.com/Pizza/Images/Ingredients4/" + filename_base + ".png";

        // add to kitchen data
        if (category == "box")
            AddBox(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData);
        else if (category == "paper")
            AddPaper(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData);
        else if (category == "crust")
            AddCrust(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData);
        else if (category == "sauce")
            AddSauce(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData); 
        else if (category == "cheese")
            AddCheese(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData);  
        else // assume topping
            AddTopping(fullPath, niceName, minScale, maxScale, minPer, maxPer, KitchenData);    
    }
    else
    {
        //console.log(filename_full + " does NOT exist");  
        console.log(row["unique_id"] + " with filename " + filename_base + " does NOT exist");         
    }

  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    // since we don't have a KitchenData prep tool yet, prep it here
    HACK_prepKitchenData(KitchenData);

    // now write the KitchenData out to JSON file
    let data = JSON.stringify(KitchenData);
    fs.writeFileSync('kitchen_data.json', data);
  });

/*
// iterate folder
var files = fs.readdirSync(ingredients_folder_name);
files.forEach(function(file) {

    // skip...
    if (file[0] == '.')
        return;

  //console.log(file);
  var srcPath = path.join(ingredients_folder_name, file);     
 
  var stat = fs.statSync(srcPath);
    if (stat.isFile())
    {
         //console.log(file);

         // to lowercase
         file = file.toLowerCase();

          // tokenize the filename, stripping off extension first
          var fileForTokens = file.split('.').slice(0, -1).join('.');
          var tokens = fileForTokens.split("-");

          // TODO: later we can derive better info from the filename
          // look for keywords "box", "crust", "sauce", "cheese"
          // otherwise assume its a topping

          var fullPath = "https://www.oxbone.com/Pizza/Images/Ingredients2/" + file;

           //console.log(tokens);
           if (isA(tokens, "topping") == true)
                AddTopping(fullPath, tokens[3], KitchenData); 
            else
            if (isA(tokens, "box") == true)
                AddBox(fullPath, tokens[2], KitchenData);
            else if (isA(tokens, "paper") == true)
                AddPaper(fullPath, tokens[2], KitchenData);
            else if (isA(tokens, "crust") == true)
                AddCrust(fullPath, tokens[2], KitchenData);
            else if (isA(tokens, "sauce") == true)
                AddSauce(fullPath, tokens[2], KitchenData); 
            else if (isA(tokens, "cheese") == true)
                AddCheese(fullPath, tokens[2], KitchenData);  
            else // assume topping
                AddTopping(fullPath, tokens[3], KitchenData);        
    }
})
*/