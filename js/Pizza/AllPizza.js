/////////////////////////////////////////////////////////////////////////////////
//
// Pizza
// Jamie Davis
// 2021
//
/////////////////////////////////////////////////////////////////////////////



// TODO: make an editor for this!!
// then read it in from JSON(s) files.

var KitchenData = {

    Rules: { 
        MAX_TOPPINGS_PER_PIZZA: 10,
        MAX_CHEESES_PER_PIZZA: 1,
        RADIUS_OF_TOPPINGS_WITHIN_CRUST: 0.4,       // TODO: get this from Anthony/art specs
    },

    // TODO: refactor these so that boxes crusts, sauces, cheeses contains variant objects, each with different rarities.
    Boxes: [
        // Variant
        {
            name: "Box with waxpaper",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-0-box-r1-waxchecker-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [0,0]
        },
        {
            name: "Box without waxpaper",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-0-box-r0-cardboard-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [0,0]
        }
    ],

    WaxPapers: [

    ],

    Crusts: [
        {
            name: "Thick",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-1-crust-r0-thick-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Thin",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-1-crust-r0-thin-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },   
    ],


    Sauces: [
        {
            name: "Tomato",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-120-sauce-r0-tomato-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159] 
        },  
        {
            name: "BBQ",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-2-sauce-r2-bbq-v0.png"                     ],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Pesto",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-120-sauce-r0-pesto-v0.png",
            "http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-120-sauce-r0-pesto-v1.png"
                    ],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },     
        {
            name: "Mayo Squirt",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-130-squirt-r0-mayosquirt-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
    ],

    Cheeses: [
        {
            name: "Feta Cheese",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-3-cheese-r0-feta-v0.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Mozzarella Cheese",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-8-cheese-r0-mozzarella-v1.png"],
            sizeVarianceMinMax: [1.0, 1.0],
            countVarianceMinMax: [1,1],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },                
    ],

    Toppings: [
        // TODO: refactor these so that topping contains variant objects, each with different rarities.
        {
            name: "Turkey Sausage",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-115-meat-r1-turkeysausage-v0.png"],
            sizeVarianceMinMax: [0.1, 0.15],
            countVarianceMinMax: [10,20],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Meteorite",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-131-misc-r1-meteorite-v1.png"],
            sizeVarianceMinMax: [0.15, 0.3],
            countVarianceMinMax: [1,2],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Star Candy",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-128-candy-r0-starcandies-v0.png"],
            sizeVarianceMinMax: [0.05, 0.09],
            countVarianceMinMax: [1,3],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },
        {
            name: "Shrimp",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-58-seafood-r4-shrimp-v0.png"],
            sizeVarianceMinMax: [0.09, 0.15],
            countVarianceMinMax: [10,20],
            rotationVarianceMinMax: [-0.5, 0.5]
        },
        {
            name: "Chili Pepper",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-67-peppers-r4-chilli-v0.png"],
            sizeVarianceMinMax: [0.09, 0.15],
            countVarianceMinMax: [10,20],
            rotationVarianceMinMax: [-3.14159,3.14159]
        },   
        {
            name: "Pop Rocks",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-99-r1-poprocks-v0.png"],
            sizeVarianceMinMax: [0.2, 0.4],
            countVarianceMinMax: [1,2],
            rotationVarianceMinMax: [-0.3,0.3]
        },    
        {
            name: "Worm",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-24-insect-r3-worm-v0.png"],
            sizeVarianceMinMax: [0.08, 0.15],
            countVarianceMinMax: [5, 10],
            rotationVarianceMinMax: [-3.14159,3.14159]
        }, 

        {
            name: "Rainbow Pepperoni",
            imageUrls: ["http://www.oxbone.com/Pizza/Images/Ingredients/rarepizzas-158-meat-r3-rainbowpepperoni-v1.png"],
            sizeVarianceMinMax: [0.08, 0.15],
            countVarianceMinMax: [5, 10],
            rotationVarianceMinMax: [-3.14159,3.14159]
        }, 

    ],

}




/////////////////////////////////////////////////////////////////////////////////
//
// Pizza
// Jamie Davis
// 2021
//
/////////////////////////////////////////////////////////////////////////////


// TODO: a better rand func?
// it needs to be cross platform, cross-language, etc.
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// hash function
function hash(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  

// Utils
function randomRange(rand, min, max) 
{
    return Math.round(((rand() * (max - min)) + min));
}

function randomRangeFloat(rand, min, max) 
{
    return ((rand() * (max - min)) + min);
}


// normalized -1 to 1

var PI = 3.14159;
var TWO_PI = 2.0 * PI;
function randomPointOnCircle(rand, centerX, centerY, radius)
{
    var theta = TWO_PI * rand();
    var r = Math.sqrt(rand());
    var x = centerX + r * radius * Math.cos(theta);
    var y = centerY + r * radius * Math.sin(theta);
    return [x,y];
}

function randomScatter(rand, t, renderObj, KitchenData) {
    // subtract scale radius from the crust radius so the topping will fit inside (somewhat, it could still be rotate further out, but okay)
    return randomPointOnCircle(rand, 0.5, 0.5, KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObj.scale / 2.0); 
}



function generateDisplayList(pizza, KitchenData) {
    // this will output a normalized display list
    // it may include a texture dictionary as well

    var displayBundle = {};
    var textureToIndexMap = new Map();
    displayBundle.textureList = [];
    displayBundle.displayList = [];

    // now generate renderables and push onto list
    var renderObj = {};

    // box
    renderObj = {};
    var box = KitchenData.Boxes[pizza.boxIndex];
    createAndAppendRenderObjFromVariant(pizza.rand, box, displayBundle, textureToIndexMap, null);   

    // crust
    renderObj = {};
    var crust = KitchenData.Crusts[pizza.crustIndex];
    createAndAppendRenderObjFromVariant(pizza.rand, crust, displayBundle, textureToIndexMap, null);   

    // sauce
    for (var i = 0; i < pizza.sauceIndices.length; i++)
    {
        renderObj = {};
        var sauce = KitchenData.Sauces[i];
        createAndAppendRenderObjFromVariant(pizza.rand, sauce, displayBundle, textureToIndexMap, null); 
    }  
    
    // cheese
    for (var i = 0; i < pizza.cheeseIndices.length; i++)
    {
        renderObj = {};
        var cheese = KitchenData.Cheeses[i];
        createAndAppendRenderObjFromVariant(pizza.rand, cheese, displayBundle, textureToIndexMap, null); 
    }  

    // Toppings
    for (var i = 0; i < pizza.toppingIndices.length; i++)
    {
        var toppingIndex = pizza.toppingIndices[i];
        var topping = KitchenData.Toppings[toppingIndex];

        var toppingCount = randomRange(pizza.rand, topping.countVarianceMinMax[0], topping.countVarianceMinMax[1]);
        for (var iCount = 0; iCount < toppingCount; iCount++)
        {
            createAndAppendRenderObjFromVariant(pizza.rand, topping, displayBundle, textureToIndexMap, randomScatter);   
        }
    }

    return displayBundle;

}


// for now scatter is bool, but later will be a callback or delegate
function createAndAppendRenderObjFromVariant(rand, variant, displayBundle, textureToIndexMap, scatter) {
    var renderObj = {};
    var imageIndex = randomRange(rand, 0, variant.imageUrls.length - 1);  

    // see if texture name is already in list
    var textureListIndex;
    if (textureToIndexMap.has(variant.imageUrls[imageIndex]) == true)
    {
        textureListIndex = textureToIndexMap.get(variant.imageUrls[imageIndex]);
    }
    else{
        // add to list and map
        textureListIndex = displayBundle.textureList.length;
        displayBundle.textureList.push(variant.imageUrls[imageIndex]);
        textureToIndexMap.set(variant.imageUrls[imageIndex], textureListIndex);
    }
    renderObj.textureIndex = textureListIndex;

    // set scale
    renderObj.scale = randomRangeFloat(rand, variant.sizeVarianceMinMax[0], variant.sizeVarianceMinMax[1]);
    // set rotation
    if (variant.rotationVarianceMinMax == undefined)
        renderObj.rotation = 0;
    else
        renderObj.rotation = randomRangeFloat(rand, variant.rotationVarianceMinMax[0], variant.rotationVarianceMinMax[1]);  

    // TODO: handle different scatter patterns besides random.
    //  for some we might need to know total count of toppings
    //  what might work is a scatter delegate that takes parameterized values and returns coords.
    // then the scatter func that implement anything it wants, like smiley face, etc.
    // we might a scatter min/max queries so we know if a particular scatter will work with the number of coords we chose, 
    // and if not adjust them or choose another scatter.
    if (scatter)
        renderObj.center = scatter(rand, 0, renderObj, KitchenData); 
    else
        renderObj.center = [0.5, 0.5];        

    displayBundle.displayList.push(renderObj);   
    return renderObj;
}



// char encoding
const encodingString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var charToNumMap = new Map();
for (var i = 0; i < encodingString.length; i++)
    charToNumMap[encodingString[i]] = i;

function encodeNumToChar(num) {
    if (num < 0 || num >= encodingString.length)
    {
        console.log("ERROR! out of range.");
        return 0;
    }
    return encodingString[num];
}

function decodeCharToNum(c) {
    return charToNumMap[c];
}


function Pizza() {
}

Pizza.prototype.makeRandom = function(overrides, KitchenData) 
{
    var pizzaDNA = 0;

    // calc random seed
    // create box index
    // create crust index
    // create sauces mask
    //  - count
    //  - rotations
    // create cheeses mask   
     //  - count
    //  - rotations   
    // create toppings mask
    //  - count
    //  - rotations
    //  - scales

    // don't use the pizza rand to create topping indices as then it won't match up with the 
    // rand on the other side when a pizza is created from the same seed
    var localRand = mulberry32(Date.now() - 100);

    // randomly choose box
    this.boxIndex = randomRange(localRand, 0, KitchenData.Boxes.length - 1);

    // TODO: paper underlayment?

    // randomly choose crust
    this.crustIndex = randomRange(localRand, 0, KitchenData.Crusts.length - 1);

    // randomly choose sauce
    // TODO: take into account rarity, etc.
    this.sauceIndices = [];
    var numSauces = randomRange(localRand, 0, KitchenData.Sauces.length);
    for (var iSauce = 0; iSauce < numSauces; iSauce++)
    {
        this.sauceIndices.push(randomRange(localRand, 0, KitchenData.Sauces.length - 1));
    }

    // randomly choose cheese
    // TODO: take into account rarity, etc.
    this.cheeseIndices = [];
    var numCheeses = randomRange(localRand, 0, KitchenData.Cheeses.length);
    for (var iCheese = 0; iCheese < numCheeses; iCheese++)
    {
        this.cheeseIndices.push(randomRange(localRand, 0, KitchenData.Cheeses.length - 1));
    }

    // randomly choose toppings
    // TODO: take into account rarity, etc.
    this.toppingIndices = [];
    var numToppings = randomRange(localRand, 0, KitchenData.Toppings.length);
    for (var iTopping = 0; iTopping < numToppings; iTopping++)
    {
        this.toppingIndices.push(randomRange(localRand, 0, KitchenData.Toppings.length - 1));
    }

    // choose and seed random generator
    this.seed = Date.now(); // TODO: choose better seed?
    this.rand = mulberry32(this.seed); 

    this.dna = this.calculateDNA();
    return this.dna;
}

Pizza.prototype.makeFromDna = function(dna) 
{
    this.dna = dna;

    var currIndex = 0;
    this.boxIndex = decodeCharToNum(dna[currIndex++]);
    this.crustIndex = decodeCharToNum(dna[currIndex++]);   
    var numSauces = decodeCharToNum(dna[currIndex++]);
    this.sauceIndices = [];
    for (var i = 0; i < numSauces; i++)
        this.sauceIndices.push(decodeCharToNum(dna[currIndex++]));
    var numCheeses = decodeCharToNum(dna[currIndex++]);        
    this.cheeseIndices = [];
    for (var i = 0; i < numCheeses; i++)
        this.cheeseIndices.push(decodeCharToNum(dna[currIndex++]));
    var numToppings = decodeCharToNum(dna[currIndex++]);        
    this.toppingIndices = [];
    for (var i = 0; i < numToppings; i++)
       this.toppingIndices.push(decodeCharToNum(dna[currIndex++]));
    
    // the rest is the seed
    this.seed = parseInt(dna.slice(currIndex));
    this.rand = mulberry32(this.seed); 
}


Pizza.prototype.calculateDNA = function() {
    // for now, a string:
    var dna = "";

    dna += encodeNumToChar(this.boxIndex);
    dna += encodeNumToChar(this.crustIndex);

    // TODO: for the indices, use bitfields encoded into chars.

    // TODO: encode into char
    dna += encodeNumToChar(this.sauceIndices.length);
    for (var i = 0; i < this.sauceIndices.length; i++)
        dna += encodeNumToChar(this.sauceIndices[i]);
    // TODO: encode into char
    dna += encodeNumToChar(this.cheeseIndices.length);    
    for (var i = 0; i < this.cheeseIndices.length; i++)
        dna += encodeNumToChar(this.cheeseIndices[i]); 
    // TODO: encode into char
    dna += encodeNumToChar(this.toppingIndices.length);    
    for (var i = 0; i < this.toppingIndices.length; i++)
        dna += encodeNumToChar(this.toppingIndices[i]); 

    // seed
    dna += this.seed;

    // return
    return dna;
}



exports.Pizza = Pizza
exports.generateDisplayList = generateDisplayList
exports.randomScatter = randomScatter
exports.mulberry32 = mulberry32
exports.randomRange = randomRange
exports.randomRangeFloat = randomRangeFloat
exports.randomPointOnCircle = randomPointOnCircle
exports.KitchenData = KitchenData







