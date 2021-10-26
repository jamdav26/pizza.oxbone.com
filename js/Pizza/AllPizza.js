/////////////////////////////////////////////////////////////////////////////////
//
// Pizza
// Jamie Davis
// 2021
//
/////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////
// The Rand function
//////////////////////////////////////
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
  

//////////////////////////////////
// Utils
//////////////////////////////////
function randomRange(rand, min, max) 
{
    return Math.round(((rand() * (max - min)) + min));
}

function randomRangeFloat(rand, min, max) 
{
    return ((rand() * (max - min)) + min);
}

var PI = 3.14159;
var TWO_PI = 2.0 * PI;
function randomPointOnDisk(rand, centerX, centerY, radius)
{
    var theta = TWO_PI * rand();
    var r = Math.sqrt(rand());
    var x = centerX + r * radius * Math.cos(theta);
    var y = centerY + r * radius * Math.sin(theta);
    return [x,y];
}

class Vec2 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    rotate(rads) {
        var cosRads = Math.cos(rads);
        var sinRads = Math.sin(rads);
        var x = this.x * cosRads - this.y * sinRads;
        var y = this.y * cosRads + this.x * sinRads;
        this.x = x;
        this.y = y;
    }

    distance(v)
    {
        var distSquared = this.distanceSquared(v);
        return Math.sqrt(distSquared);
    }

    distanceSquared(v)
    {
        var dX = (this.x - v.x);
        dX *= dX;
        var dY = (this.y - v.y);
        dY *= dY;
        return (dX + dY);
    }  

    length()
    {  
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared()
    {
        return this.x * this.x + this.y * this.y;
    }

    normalize()
    {
        var len = this.length();
        this.x /= len;
        this.y /= len;
    }

    scale(s)
    {
        this.x *= s;
        this.y *= s;
    }   

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
    }

    vecTo(v)
    {
        return new Vec2(v.x - this.x, v.y - this.y);
    }
}

/////////////////////////////////////////////////////////////////
// Scatters
/////////////////////////////////////////////////////////////////

// Scatter objects
class Scatter {
    constructor(name) {
        this.name = name;
        // add to scattertable
        Scatter.table[this.name] = this;
    } 

    // pure virtual
    scatter(rand, count, renderObjList, KitchenData) {
    }

    getMinInstanceCount() {
        return this.minInstanceCount;
    }
    getMaxInstanceCount() {
        return this.maxInstanceCount;
    }    
    
    // static table of all created scatter objects
    static table = {};
    
}

class RandomScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        var ret = [];
        for (var i = 0; i < count; i++)
        {
            // subtract scale radius from the crust radius so the topping will fit inside (somewhat, it could still be rotate further out, but okay)
            ret.push(randomPointOnDisk(rand, 0.0, 0.0, KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[i].scale / 2.0));
        }
        return ret;
    }
}

class SpiralScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        // 
        // r=a + b * angle
        // 
        // choose a rate that angle moves and rate that radius increases
        // TODO: these should be part of scatter method data??
        var angleVel = randomRangeFloat(rand, -3.0, 3.0) * PI / count;
        var maxRadius = KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - 0.1; //renderObjList[0].scale / 2.0;       // max radius will be outer edge of crust minus scale of first element. not exactly correct, but close enough. we will adjust the actual instance in further if necessary.
        var rVel = randomRangeFloat(rand, 1, 2) * maxRadius / count
        var currAngle = randomRangeFloat(rand, 0, TWO_PI);
        var currR = 0;
        var ret = [];
        for (var i = 0; i < count; i++)
        {
            currR = Math.min(currR, KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[i].scale / 2.0);

            // rotate currR thru currAngle. that is position
            var x = currR * Math.cos(currAngle);
            var y = currR * Math.sin(currAngle);

            // accum
            currAngle += angleVel;
            currR += rVel;

            ret.push([x,y]);
        }
        return ret;
    }
}

class FaceScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        var ret = [];
    
        var used = 0;
    
        // place left eye
        if (used < count)
        {
            var len = (KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[used].scale / 2.0) / 1.5;
            var angle = -3 * PI / 4;
    
            var x = len * Math.cos(angle);
            var y = len * Math.sin(angle);
    
            ret.push([x,y]);
            used++;
        }
    
        // place right eye
        if (used < count)
        {
            var len = (KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[used].scale / 2.0) / 1.5;
            var angle = -PI / 4;
    
            var x = len * Math.cos(angle);
            var y = len * Math.sin(angle);
    
            ret.push([x,y]);
            used++;
        }
 
        // calc the max scale in the topping list
        var maxScale = 0.0;
        for(var iRO = 0; iRO < renderObjList.length; iRO++)
        {
            if (renderObjList[iRO].scale > maxScale)
            maxScale = renderObjList[iRO].scale;
        }

        // place smile with remaining pieces
                    
        // choose centerpoint of smile
        var smileCenter = [0.0, 0.0];
        var smileRadius = KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - maxScale / 2.0;

        var numSteps = count - used;
        if (numSteps <= 1)
        {
            for (var i = 0; i < numSteps; i++)
            {
                // right in center of mouth  
                ret.push([smileCenter.x + smileRadius, smileCenter.y + smileRadius]);
            }
        }
        else
        {
            var minAngle = PI / 2 - (PI / 4.0);
            var maxAngle = PI / 2 + (PI / 4.0);

            var angleInc = (maxAngle - minAngle) / (numSteps - 1);
            for (var i = 0; i < numSteps; i++)
            {
                var angle = minAngle + i * angleInc;

                // rotate the vec around ang
                // calculate point
                var x = smileRadius * Math.cos(angle);
                var y = smileRadius * Math.sin(angle);

                // offset by smile center
                x = x + smileCenter[0];
                y = y + smileCenter[1];
     
                ret.push([x,y]);
            }
        }
/*
        // place mouth - line for now
        var startX = -.25;
    
        var numSteps = count - used;
        if (numSteps <= 1)
        {
            for (var i = 0; i < numSteps; i++)
            {
                // right in center of mouth
                var x = 0.0;
                var y = 0.25;    
                ret.push([x,y]);
            }
        }
        else
        {
            var inc = 0.5 / (numSteps - 1);
            for (var i = 0; i < numSteps; i++)
            {
                var x = startX + i * inc;
                var y = 0.25;

                // TODO: adjust to make sure it doesn't go off the crust.
                
                ret.push([x,y]);
            }
        }
    */

        return ret;
    }
}

class SpokesScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        var ret = [];

        // calculate number of spokes
        // calculate number of points per spoke
        const MIN_POINTS_PER_SPOKE = 2;
        const MAX_POINTS_PER_SPOKE = 6;
        var maxPerSpoke = randomRange(rand, MIN_POINTS_PER_SPOKE, MAX_POINTS_PER_SPOKE);
        var numSpokes = 2;
        var numPointsPerSpoke = Math.floor(count / numSpokes);
        while (numPointsPerSpoke > maxPerSpoke)
        {
            numSpokes++;
            numPointsPerSpoke = Math.floor(count / numSpokes);
        }
    
        // now calculate the excess (how many more we have than we will scatter on the spokes)
        var extra = count - (numSpokes * numPointsPerSpoke);
    
    
        var iCount = 0;
        // HACK: for now put extras in the middle, but later may want to randomize it
        for  (var iExtra = 0; iExtra < extra; iExtra++)
        {
            ret.push([0,0]);
            iCount++;
        }
    
        // if count > 0
        if (numSpokes * numPointsPerSpoke > extra)
        { 
            // for each point on a spoke
            var maxRadius = KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[0].scale / 2.0;       // max radius will be outer edge of crust minus scale of first element. not exactly correct, but close enough. we will adjust the actual instance in further if necessary.
      
            var rInc = maxRadius / numPointsPerSpoke;
            var angInc = TWO_PI / numSpokes;
            var angStart = randomRange(rand, 0, PI);
            for (var iPoint = 0; iPoint < numPointsPerSpoke; iPoint++)
            {
                var len = (iPoint + 1) * rInc;
    
                // adjust len so obj fits inside the play area
                len = Math.min(len, KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[iCount].scale / 2.0);
    
                // for each spoke
                for (var iSpoke = 0; iSpoke < numSpokes; iSpoke++)
                {
                    // choose angle
                   var angle = angStart + iSpoke * angInc;
    
                    // calculate point
                    var x = len * Math.cos(angle);
                    var y = len * Math.sin(angle);
                    ret.push([x,y]);
                    iCount++;         
                }
            }   
    
        }
        return ret;
    }
}

class ConcentricCirclesScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        var ret = [];
    
        // calculate number of circles
        // calculate number of points per circle
        const MIN_POINTS_PER_CIRCLE = 3;
        const MAX_POINTS_PER_CIRCLE = 6;
        var maxPerCircle = randomRange(rand, MIN_POINTS_PER_CIRCLE, MAX_POINTS_PER_CIRCLE);
        var numCircles = 2;
        var numPointsPerCircle = Math.floor(count / numCircles);
        while (numPointsPerCircle > maxPerCircle)
        {
            numCircles++;
            numPointsPerCircle = Math.floor(count / numCircles);
        }
    
        // now calculate the excess (how many more we have than we will scatter on the circles)
        var extra = count - (numCircles * numPointsPerCircle);
        
        var iCount = 0;
        // HACK: for now put extras in the middle, but later may want to randomize it
        for  (var iExtra = 0; iExtra < extra; iExtra++)
        {
            ret.push([0,0]);
            iCount++;
        }
    
        // if count > 0
        if (numCircles * numPointsPerCircle > extra)
        { 
            // for each circle
            var maxRadius = KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[0].scale / 2.0;       // max radius will be outer edge of crust minus scale of first element. not exactly correct, but close enough. we will adjust the actual instance in further if necessary.
    
            var rInc = maxRadius / numCircles;
            var angInc = TWO_PI / numPointsPerCircle;
            var angStart = randomRange(rand, 0, PI);
            for (var iCircle = 0; iCircle < numCircles; iCircle++)
            {
                var len = (iCircle + 1) * rInc;
                angStart += iCircle * angInc / numCircles;  // stagger the concentric circles a little, otherwise would look like spokess
                // adjust len so obj fits inside the play area
                len = Math.min(len, KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST - renderObjList[iCount].scale / 2.0);
            
                // for each point on a circle
                for (var iPoint = 0; iPoint < numPointsPerCircle; iPoint++)
                {
                    // choose angle
                    var angle = angStart + iPoint * angInc;
    
                    // calculate point
                    var x = len * Math.cos(angle);
                    var y = len * Math.sin(angle);
                    ret.push([x,y]);
                    iCount++;         
                }
            }   
        }
        return ret;    
    }        
}

class GridScatter extends Scatter {
    constructor(name, minInstanceCount = -1, maxInstanceCount = -1) {
        super(name);
        this.minInstanceCount = minInstanceCount;
        this.maxInstanceCount = maxInstanceCount; 
    }

    scatter(rand, count, renderObjList, KitchenData) {
        var ret = [];

        // divide the disk into grids and put a topping in each one.
        var gridDimX = Math.floor(Math.sqrt(count));
        var gridDimY = Math.ceil(count / gridDimX);

        // iterate grids and place an instance randomly in each
        var placedCount = 0;
        // calc the max scale in the topping list
        var maxScale = 0.0;
        for(var iRO = 0; iRO < renderObjList.length; iRO++)
        {
            if (renderObjList[iRO].scale > maxScale)
            maxScale = renderObjList[iRO].scale;
        }
         // base entire square off of the radius - the max scale
        var start = -0.5 + (0.5 - KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST) + maxScale / 2;
        var squareWidth = 2 * Math.abs(start);
        var gridSizeX = squareWidth / gridDimX;   
        var gridSizeY = squareWidth / gridDimY;       
        for (var i = 0; i < gridDimY; i++)
        {
            for (var j = 0; j < gridDimX; j++)
            {
                // don't walk off the list!
                if (placedCount >= renderObjList.length)
                    break;

                var left = start + gridSizeX * j;
                var top = start + gridSizeY * i;

                // calculate scale of this object
                var objScale = renderObjList[placedCount].scale;

                // pick random pos in this grid, shrinking area by the scale of the topping
                var varianceX = gridSizeX / 2.0 - objScale / 2.0;
                if (varianceX < 0)
                    varianceX = gridSizeX / 2.0;
                var varianceY = gridSizeY / 2.0 - objScale / 2.0;
                if (varianceY < 0)
                    varianceY = gridSizeY / 2.0;
               var x = randomRangeFloat(rand, left + varianceX, left + gridSizeX - varianceX);
                var y = randomRangeFloat(rand, top + varianceY, top + gridSizeY - varianceY); 
             
                // slam to center of grid
             //   x = left + gridSizeX/2;
             //   y = top + gridSizeY/2;   
     
                // test slam to grid UL
           //     x = left;
           //     y = top; 

                // TODO: if this center + scale pushes it past the allowable edge, push it back
                // inward towards center
               var zeroVec = new Vec2(0,0);
               var vec = new Vec2(x, y);           
               var vecToCenter = vec.vecTo(zeroVec);      
               var distFromCenter = vec.length() + objScale;
               var distOver = distFromCenter - KitchenData.Rules.RADIUS_OF_TOPPINGS_WITHIN_CRUST;
               //console.log("distanceFromCenter = " + distFromCenter);
               if (distOver > 0.0)
               {
                    distOver = Math.min(distOver, (1.0 - objScale)/2);
                 //  console.log("moving back by " + distOver);
                   //move back towards center by distOver
                   vecToCenter.normalize();
                   vecToCenter.scale(distOver);
                   vec.add(vecToCenter);
               }

                ret.push([vec.x,vec.y]);  
                placedCount++;      
            }          
        }

        // pick up the rest of count that 
        while (placedCount < count)
        {
            // TODO: for now put at center
            ret.push([0,0]);  
            placedCount++;
        }

        // for fun, rotate all points by angle
        var rads = randomRangeFloat(rand, -PI, PI);
        for (var i = 0; i < ret.length; i++) {
            var pt = ret[i];
            var vec = new Vec2(pt[0], pt[1]);
            vec.rotate(rads);
            ret[i][0] = vec.x;
            ret[i][1] = vec.y;
        }

        return ret;
    }
}

/////////////////////////
// create some scatters
/////////////////////////
new RandomScatter("Random");
new SpiralScatter("Spiral");
new FaceScatter("Face");
new SpokesScatter("Spokes");
new ConcentricCirclesScatter("Concentric Circles");
new GridScatter("Grid");

//////////////////////////////////////////////////
// Display List
//////////////////////////////////////////////////
const DL_VERSION = 1;
function generateDisplayList(pizza, KitchenData) {
    // this will output a normalized display list
    // it may include a texture dictionary as well

    var displayBundle = {};
    var textureToIndexMap = new Map();
    displayBundle.textureList = [];
    displayBundle.displayList = [];
    displayBundle.version = DL_VERSION;

    // create rand from the pizza seed
    var rand = mulberry32(pizza.seed); 


    // now generate renderables and push onto list
    var renderObj = {};

    // box
    renderObj = {};
    var box = KitchenData.Boxes[pizza.boxIndex];
    renderObj = createAndAppendRenderObjFromVariant(rand, box, displayBundle, textureToIndexMap);   
    displayBundle.displayList.push(renderObj);

      // paper
      if (pizza.paperIndex >= 0)
      {
        renderObj = {};
        var paper = KitchenData.Papers[pizza.paperIndex];
        renderObj = createAndAppendRenderObjFromVariant(rand, paper, displayBundle, textureToIndexMap);   
        displayBundle.displayList.push(renderObj);  
      }

    // crust
    renderObj = {};
    var crust = KitchenData.Crusts[pizza.crustIndex];
    renderObj = createAndAppendRenderObjFromVariant(rand, crust, displayBundle, textureToIndexMap);   
    displayBundle.displayList.push(renderObj);

    // sauce
    renderObj = {};  
    var sauce = KitchenData.Sauces[pizza.sauceIndex];
    renderObj = createAndAppendRenderObjFromVariant(rand, sauce, displayBundle, textureToIndexMap); 
    displayBundle.displayList.push(renderObj);

    
    // cheese
    for (var i = 0; i < pizza.cheeseIndices.length; i++)
    {  
        renderObj = {};
        var cheeseIndex = pizza.cheeseIndices[i].index;
        var cheese = KitchenData.Cheeses[cheeseIndex];
        renderObj = createAndAppendRenderObjFromVariant(rand, cheese, displayBundle, textureToIndexMap); 
        displayBundle.displayList.push(renderObj);
    }  

    // Toppings
    for (var i = 0; i < pizza.toppingIndices.length; i++)
    {
        var toppingIndex = pizza.toppingIndices[i].index;
        var topping = KitchenData.Toppings[toppingIndex];

        // TODO: later the count might be embedded in the dna, so it will be calculated in the make() function
        var toppingCount = pizza.toppingIndices[i].instanceCount;

        // scatter
        // TODO: move this to the make function
        var scatterIndex = pizza.toppingIndices[i].scatterIndex;
        var scatter = Scatter.table[KitchenData.ScatterMethods[scatterIndex].name];

        var toppingRenderObjs = [];
        for (var iCount = 0; iCount < toppingCount; iCount++)
        {
            renderObj = createAndAppendRenderObjFromVariant(rand, topping, displayBundle, textureToIndexMap);  
            toppingRenderObjs.push(renderObj); 
        }

        // now call scatter to get positions, then append them
        var positions = scatter.scatter(rand, toppingCount, toppingRenderObjs, KitchenData);

    // HACK force face
    //var positions = Scatter.table["Face"].scatter(rand, toppingCount, toppingRenderObjs, KitchenData);

        // TODO: assert positions.length == toppingCount
        for (var iCount = 0; iCount < toppingCount; iCount++)
        {
            renderObj = toppingRenderObjs[iCount];

            // TODO: here we could globally force each topping to be on crust by pushing it in toward
            // the center by the scaled radius so that it fits.
            renderObj.center = positions[iCount];
            displayBundle.displayList.push(renderObj);
        }
    }

    return displayBundle;

}

function createAndAppendRenderObjFromVariant(rand, variant, displayBundle, textureToIndexMap) {
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
    renderObj.scale = randomRangeFloat(rand, variant.sizeMinMax[0], variant.sizeMinMax[1]);
    // set rotation
    if (variant.rotationMinMax == undefined)
        renderObj.rotation = 0;
    else
        renderObj.rotation = randomRangeFloat(rand, variant.rotationMinMax[0], variant.rotationMinMax[1]);  

    renderObj.center = [0.0, 0.0];        

    return renderObj;
}


///////////////////////////
// char encoding
//  TODO: make this a class
///////////////////////////

const encodingString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.";
var charToNumMap = new Map();
for (var i = 0; i < encodingString.length; i++)
  charToNumMap.set(encodingString[i], i);

function isInEncodingSet(c) {
    if (charToNumMap.has(c) == true)
        return true;
    else
        return false;
}

function encodeNumToChar(num) {
    if (num < 0 || num >= encodingString.length)
    {
        console.log("ERROR! out of range.");
        return 0;
    }
    return encodingString[num];
}

function decodeCharToNum(c) {
    return charToNumMap.get(c);
}


/////////////////////////////////////////
// Encoder class
/////////////////////////////////////////
function Encoder(str) {
    this.encodingString = str;
    this.MAX_NUM = this.encodingString.length;  // max number that can be encoded 
    this.charToNumMap = new Map();
    for (var i = 0; i < this.encodingString.length; i++)
        this.charToNumMap.set(this.encodingString[i], i);

    // calc max bits stored in each char
    this.MAX_BITS = 0;
    var x = this.MAX_NUM;
    while (x > 0)
    {
        this.MAX_BITS++;  
        x = Math.floor(x / 2);
    }
}

Encoder.prototype.contains = function(chr) {
    return this.charToNumMap.has(chr);
}

Encoder.prototype.encodeNumber = function(num) {
    if (num < 0 || num >= this.encodingString.length)
    {
        console.log("ERROR! out of range.");
        return 0;
    }
    return this.encodingString[num];
}

Encoder.prototype.decodeChar = function(chr) {
    return this.charToNumMap.get(chr);
}


// HACK function. Should probably go with KitchenData, since that's where the probability values are cooked.
function KITCHEN_chooseItem(items, diceRoll) {
    // binary search the items list
    var lo = 0;
    var hi = items.length - 1;

    //console.log(items);
    //console.log(diceRoll);
    while (lo <= hi) {
        //console.log("lo = " + lo + " and hi = " + hi);
        var mid = Math.floor(lo + (hi - lo) / 2);
        if (diceRoll == items[mid].probabilityTier)
            return mid;
        else
        if (diceRoll > items[mid].probabilityTier)
            lo = mid + 1;  
        else
        {
            if (lo == mid)
                return mid;
            else
                hi = mid;    
        }    
    }
    return hi;
}



//////////////////////////////////////////
// Pizza
//////////////////////////////////////////
function Pizza() {
}

Pizza.prototype.makeRandom = function(overrides, toppingCount, KitchenData) 
{
    var pizzaDNA = 0;

    // when creating the pizza dna, just use any old rand seed.
    var localRand = mulberry32(Date.now());

    // choose box
    this.boxIndex = KITCHEN_chooseItem(KitchenData.Boxes, randomRangeFloat(localRand, 0.0, 1.0));

    // choose paper
    this.paperIndex = KITCHEN_chooseItem(KitchenData.Papers, randomRangeFloat(localRand, 0.0, 1.0));

    // randomly choose crust
    this.crustIndex = KITCHEN_chooseItem(KitchenData.Crusts, randomRangeFloat(localRand, 0.0, 1.0));

    // randomly choose sauce
    this.sauceIndex = KITCHEN_chooseItem(KitchenData.Sauces, randomRangeFloat(localRand, 0.0, 1.0));

    // randomly choose cheeses
    this.cheeseIndices = [];
    var numCheeses = randomRange(localRand, 0, Math.min(KitchenData.Rules.MAX_CHEESES_PER_PIZZA, KitchenData.Cheeses.length));
    for (var iCheese = 0; iCheese < numCheeses; iCheese++)
    {
        index = KITCHEN_chooseItem(KitchenData.Cheeses, randomRangeFloat(localRand, 0.0, 1.0));
        this.cheeseIndices.push({index: index});
    }

    // randomly choose toppings
    this.toppingIndices = [];
    // num toppings was passed into us, but if it's null then randomize it.
    var numToppings = toppingCount;
    if (numToppings == null)
        numToppings = randomRange(localRand, 0, Math.min(KitchenData.Rules.MAX_TOPPINGS_PER_PIZZA, KitchenData.Toppings.length));
    for (var iTopping = 0; iTopping < numToppings; iTopping++)
    {
        index = KITCHEN_chooseItem(KitchenData.Toppings, randomRangeFloat(localRand, 0.0, 1.0));
        var topping = KitchenData.Toppings[index];

        // choose a scatter for this topping
        var scatterIndex = KITCHEN_chooseItem(KitchenData.ScatterMethods, randomRangeFloat(localRand, 0.0, 1.0));

        // choose num instances of this topping (may query scatter for min/max range, otherwise use the topping one)
        var instanceCount = randomRange(localRand, topping.countMinMax[0], topping.countMinMax[1]);

        // TODO: possibly adjust instance count acording to chosen scatter
        // var scatter = Scatter.table[KitchenData.ScatterMethods[scatterIndex].name];
    
        this.toppingIndices.push({index: index, scatterIndex: scatterIndex, instanceCount: instanceCount});
    }

    // choose and seed random generator
    this.seed = Date.now(); // TODO: choose better seed?

    this.dna = this.calculateDNA();

    return this.dna;
}

Pizza.prototype.makeFromDna = function(dna) 
{
    // DNA is like this:
    // OVERALL:  "version" + "dna" + "_" + seed
    // version:
    //      - 1 char
    // dna:
    //      - 1 char for box index
    //      - 1 char for crust index
    //      - 1 char for sauce index
    //      - 1 char for cheese count
    //      - X chars for cheese indices, one char for each of cheese count
    //      - 1 char for topping count
    //      - Y chars for toppings. each topping has 4 chars:
    //      --      - 2 chars for topping index
    //      --      - 1 char for scatter index
    //      --      - 1 char for instance count
    //
    //
    // first, we can check to see if any character is outside our encoding char set.
    //    (EXCEPT FOR OUR DELIM "_")
    //   if so it's illegal.
    // TODO: break this out to static class function
    for (var iChar = 0; iChar < dna.length; iChar++)
    {
        var c = dna[iChar];
        if (isInEncodingSet(c) == false)
        {
            console.log("illegal dna.");
            return -1;
        }
    }

    // read version
    var currChar = 0;
    this.version = dna.substring(currChar, ++currChar);
    // TODO: READING THE REST DEPENDS ON WHICH VERSION IT IS!
    this.boxIndex = decodeCharToNum(dna.substring(currChar, ++currChar));   
    this.paperIndex = decodeCharToNum(dna.substring(currChar, ++currChar));      
    this.crustIndex = decodeCharToNum(dna.substring(currChar, ++currChar)); 
    this.sauceIndex = decodeCharToNum(dna.substring(currChar, ++currChar));   

    var numCheeses = decodeCharToNum(dna.substring(currChar, ++currChar));

    this.cheeseIndices = [];
    for (var i = 0; i < numCheeses; i++)
    {
        var index = decodeCharToNum(dna.substring(currChar, ++currChar));
        this.cheeseIndices.push({index: index});
    }

    var numToppingsFirst = decodeCharToNum(dna.substring(currChar, ++currChar));
    var numToppingsSecond = decodeCharToNum(dna.substring(currChar, ++currChar));  
    var numToppings = numToppingsFirst * 64 + numToppingsSecond; 

    this.toppingIndices = [];
    for (var i = 0; i < numToppings; i++)
    {
        var indexFirst = decodeCharToNum(dna.substring(currChar, ++currChar));
        var indexSecond = decodeCharToNum(dna.substring(currChar, ++currChar));
        var index = indexFirst * 64 + indexSecond;
        var scatterIndex = decodeCharToNum(dna.substring(currChar, ++currChar));
        var instanceCount = decodeCharToNum(dna.substring(currChar, ++currChar));
        this.toppingIndices.push({index: index, scatterIndex: scatterIndex, instanceCount: instanceCount});
    }

    // the rest is the seed
    this.seed = parseInt(dna.substring(currChar));
    
    // if we got this far then it's a valid dna, so assign it
    this.dna = dna;
}

Pizza.prototype.calculateDNA = function() {
    // for now, a string:
    var dna = "";

    this.CURRENT_VERSION = 0; 
    dna += encodeNumToChar(this.CURRENT_VERSION);

    dna += encodeNumToChar(this.boxIndex);
    dna += encodeNumToChar(this.paperIndex);   
    dna += encodeNumToChar(this.crustIndex);
    dna += encodeNumToChar(this.sauceIndex);
    dna += encodeNumToChar(this.cheeseIndices.length);
    for (var i = 0; i < this.cheeseIndices.length; i++) 
    {
        dna += encodeNumToChar(this.cheeseIndices[i].index);
    }

    dna += encodeNumToChar(Math.floor(this.toppingIndices.length / 64));
    dna += encodeNumToChar(Math.floor(this.toppingIndices.length % 64));    
    for (var i = 0; i < this.toppingIndices.length; i++) 
    {
        var toppingEntry = this.toppingIndices[i];
        dna += encodeNumToChar(Math.floor(toppingEntry.index / 64));
        dna += encodeNumToChar(Math.floor(toppingEntry.index % 64));      
        dna += encodeNumToChar(toppingEntry.scatterIndex);
        dna += encodeNumToChar(toppingEntry.instanceCount);       
    }

    dna += this.seed;

    return dna; 
}


Pizza.prototype.generateIngredientsData = function(KitchenData) {
    var ingredientsData = {};
    ingredientsData.box = {imageUrl: KitchenData.Boxes[this.boxIndex].imageUrls[0], name: KitchenData.Boxes[this.boxIndex].name, probability: KitchenData.Boxes[this.boxIndex].absoluteProbability};
    ingredientsData.paper = {imageUrl: KitchenData.Papers[this.paperIndex].imageUrls[0], name: KitchenData.Papers[this.paperIndex].name, probability: KitchenData.Papers[this.paperIndex].absoluteProbability};
     
    ingredientsData.crust = {imageUrl: KitchenData.Crusts[this.crustIndex].imageUrls[0], name: KitchenData.Crusts[this.crustIndex].name, probability: KitchenData.Crusts[this.crustIndex].absoluteProbability}; 
    ingredientsData.sauces = [];
    var sauce = KitchenData.Sauces[this.sauceIndex];
    ingredientsData.sauces.push({imageUrl: sauce.imageUrls[0], name: sauce.name, probability: sauce.absoluteProbability});
    
    ingredientsData.cheeses = [];
    for (var iCheese = 0; iCheese < this.cheeseIndices.length; iCheese++) {
        var cheese = KitchenData.Cheeses[this.cheeseIndices[iCheese].index];
        ingredientsData.cheeses.push({imageUrl: cheese.imageUrls[0], name: cheese.name, probability: cheese.absoluteProbability});
    } 
    ingredientsData.toppings = [];
    for (var iTopping = 0; iTopping < this.toppingIndices.length; iTopping++) {
        var topping = KitchenData.Toppings[this.toppingIndices[iTopping].index];
        var scatter = KitchenData.ScatterMethods[this.toppingIndices[iTopping].scatterIndex];
        ingredientsData.toppings.push({imageUrl: topping.imageUrls[0], name: topping.name, probability: topping.absoluteProbability, scatter: {name: scatter.name, probability: scatter.absoluteProbability}});
    }  
    
    return ingredientsData;
}

// util func
function getDisplayableProbability(fraction) {
    return (Math.round(fraction * 1000) / 10);
}

// this should be a static func as it does not depend on the pizza object
Pizza.prototype.calculatePizzaProbability = function(ingredientsData) {
    // keep track of overall pizza ingredients probability
    // this does NOT (yet) include dice rolls for num toppings (some might have different chances than others),
    // num instances, and scatter type.
    // that's a TODO: for at pizza making time and for here.
    // TODO: store this directly in the return object. 
    var pizzaIngredientsProbability = 1.0;

    // crust
    pizzaIngredientsProbability *= ingredientsData.crust.probability;
    // sauces
    for (var i = 0; i < ingredientsData.sauces.length; i++) {
      pizzaIngredientsProbability *= ingredientsData.sauces[i].probability;
    }

    // cheeses
    for (var i = 0; i < ingredientsData.cheeses.length; i++) {
        pizzaIngredientsProbability *= ingredientsData.cheeses[i].probability;
    }  

    // toppings
    for (var i = 0; i < ingredientsData.toppings.length; i++) {
        pizzaIngredientsProbability *= ingredientsData.toppings[i].probability;
        // multiply in the scatter
        pizzaIngredientsProbability *= ingredientsData.toppings[i].scatter.probability;      
    }  

    // box
    pizzaIngredientsProbability *= ingredientsData.box.probability;

    // return
    return pizzaIngredientsProbability;
}

// TODO: should be a static func
Pizza.prototype.generatePizzaDescription = function(ingredientsData) {

    var desc = "";

    // crust
    desc = "A " + ingredientsData.crust.name + " crust ";
    desc += " (" + getDisplayableProbability(ingredientsData.crust.probability) + "%)";
    // sauces
    for (var i = 0; i < ingredientsData.sauces.length; i++) {
      if (i == 0)
        desc += " with ";
      desc += ingredientsData.sauces[i].name;
      desc += " (" + getDisplayableProbability(ingredientsData.sauces[i].probability) + "%)";
      if (i == ingredientsData.sauces.length - 2)
        desc += " and ";

      if (i < ingredientsData.sauces.length - 2)
        desc += ", ";
    
      if (i == ingredientsData.sauces.length - 1)        
        desc += " sauce";
    }

    // cheeses
    for (var i = 0; i < ingredientsData.cheeses.length; i++) {
    if (i == 0)
        desc += " covered with ";
    desc += ingredientsData.cheeses[i].name;
    desc += " (" + getDisplayableProbability(ingredientsData.cheeses[i].probability) + "%)";
    if (i == ingredientsData.cheeses.length - 2)
        desc += " and ";

    if (i < ingredientsData.cheeses.length - 2)
        desc += ", ";
    
    if (i == ingredientsData.cheeses.length - 1)        
        desc += " cheese";

    }  

    // toppings
    for (var i = 0; i < ingredientsData.toppings.length; i++) {
    if (i == 0)
        desc += " and smothered with ";
    desc += ingredientsData.toppings[i].name;
    desc += " (" + getDisplayableProbability(ingredientsData.toppings[i].probability) + "%)";
    if (i == ingredientsData.toppings.length - 2)
        desc += " and ";
    if (i < ingredientsData.toppings.length - 2)
        desc += ", ";
    }  

    // box
    desc += ", all carefully packed in a " + ingredientsData.box.name + " box"
    desc += " (" + getDisplayableProbability(ingredientsData.box.probability) + "%)"; 

    // paper
    desc += " with " + ingredientsData.paper.name + " paper"
    desc += " (" + getDisplayableProbability(ingredientsData.paper.probability) + "%)"; 

    // end
    desc += "!";

    return desc;
  }



///////////////////////////////////////////////////
// exports
///////////////////////////////////////////////////
exports.Pizza = Pizza
exports.generateDisplayList = generateDisplayList


