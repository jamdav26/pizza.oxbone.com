
// TODO: move this function to KitchenData prep/export/authoring tool.
// it will iterate all items in an array, normalize probabalities and 
// calculate a non-decreasing probability tier for each.
function cookProbabilities(items) {
    // first calculate the total probability
    var total = 0.0;
    for (var i = 0; i < items.length; i++){
        var item = items[i];
        var rarityLevel = item.rarityLevel;
        // sanity check
        if (rarityLevel == undefined || rarityLevel == null)
        rarityLevel = 1;
        else
        if (rarityLevel < 1)
        rarityLevel = 1;

        // map rarity level to relative probability (relative to 1)
        item.relativeProbability = 1 / (Math.pow(2, rarityLevel - 1));
        total += item.relativeProbability;
    }

    // now go back back and calculate/set the absolute probability and the non-decreasing probability tier
    var tier = 0.0
    for (var i = 0; i < items.length; i++){
        var item = items[i];
        item.absoluteProbability = item.relativeProbability / total;
        tier += item.absoluteProbability;
        item.probabilityTier = tier;
    }
  }
  

function HACK_prepKitchenData(kd) {
    // cook probabilities
    cookProbabilities(kd.Boxes);   
    if (kd.Papers != undefined)  
        cookProbabilities(kd.Papers);
    cookProbabilities(kd.Crusts);
    cookProbabilities(kd.Sauces);
    cookProbabilities(kd.Cheeses);
    cookProbabilities(kd.Toppings);     
    cookProbabilities(kd.ScatterMethods);
}

exports.HACK_prepKitchenData = HACK_prepKitchenData
