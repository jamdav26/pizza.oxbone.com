const fs = require('fs');
const path = require('path');

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
    {name: "Spiral", rarityLevel: 2},
    {name: "Face", rarityLevel: 3},  
    {name: "Spokes", rarityLevel: 2},     
    {name: "Concentric Circles", rarityLevel: 2}, 
    {name: "Grid", rarityLevel: 1},                     
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


function AddBox(fullPath, name, kd)
{
    if (kd.Boxes == undefined)
        kd.Boxes = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [1.0, 1.0],
        countMinMax: [1,1],
        rotationMinMax: [0,0]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Boxes.push(entry);
}

function AddPaper(fullPath, name, kd)
{
    if (kd.Papers == undefined)
        kd.Papers = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [1.0, 1.0],
        countMinMax: [1,1],
        rotationMinMax: [0,0]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Papers.push(entry);
}

function AddCrust(fullPath, name, kd)
{
    if (kd.Crusts == undefined)
        kd.Crusts = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [1.0, 1.0],
        countMinMax: [1,1],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Crusts.push(entry);
}

function AddSauce(fullPath, name, kd)
{
    if (kd.Sauces == undefined)
        kd.Sauces = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [1.0, 1.0],
        countMinMax: [1,1],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Sauces.push(entry);
}

function AddCheese(fullPath, name, kd)
{
    if (kd.Cheeses == undefined)
        kd.Cheeses = new Array();

    var entry = {
    //    name: "Thick",
        rarityLevel: 1,
   //     imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/1100-base-crust-thick.png"],
        sizeMinMax: [1.0, 1.0],
        countMinMax: [1,1],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Cheeses.push(entry);
}

function AddTopping(fullPath, name, kd)
{ 
    if (kd.Toppings == undefined)
        kd.Toppings = new Array();

    var entry = {
    //    name: "Pepperoni",
        rarityLevel: 1,
    //    imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/4000-topping-meat-pepperoni.png"],
        sizeMinMax: [0.1, 0.15],
        countMinMax: [2,15],
        rotationMinMax: [-3.14159,3.14159]
    };

    //
    entry.imageUrls = new Array();
    entry.imageUrls.push(fullPath);
    entry.name = name;

    //append
    kd.Toppings.push(entry);
}

// iterate folder
const ingredients_folder_name = "../oxbone.com/Pizza/images/ingredients"

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

          // tokenize the filename
          var tokens = file.split("-");

          // TODO: later we can derive better info from the filename
          // look for keywords "box", "crust", "sauce", "cheese"
          // otherwise assume its a topping

          var fullPath = "https://www.oxbone.com/Pizza/Images/Ingredients/" + file;

           //console.log(tokens);
            if (isA(tokens, "box") == true)
                AddBox(fullPath, tokens[4], KitchenData);
            else if (isA(tokens, "paper") == true)
                AddPaper(fullPath, tokens[4], KitchenData);
            else if (isA(tokens, "crust") == true)
                AddCrust(fullPath, tokens[4], KitchenData);
            else if (isA(tokens, "sauce") == true)
                AddSauce(fullPath, tokens[4], KitchenData); 
            else if (isA(tokens, "cheese") == true)
                AddCheese(fullPath, tokens[4], KitchenData);  
            else // assume topping
                AddTopping(fullPath, tokens[4], KitchenData);        
    }
})

// since we don't have a KitchenData prep tool yet, prep it here
HACK_prepKitchenData(KitchenData);

// now write the KitchenData out to JSON file
let data = JSON.stringify(KitchenData);
fs.writeFileSync('kitchen_data.json', data);