//formats string by making first letter capital & the rest lowercase
// ie) dairy -> Dairy, MEAT->Meat, sNaCkS->Snacks, etc
exports.formatName = function (str) {
    let x = str.toLowerCase();
    return x.charAt(0).toUpperCase() + x.slice(1);
}