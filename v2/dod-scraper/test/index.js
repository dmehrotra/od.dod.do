var Calais = require('calais-entity-extractor').Calais;
var calais = new Calais('OZ1C5841ccgvH5UrXFh0eWDaj9Bygtkg');  //See valid options below

// You can set options after the constructor using .set(option, value). The example below sets
// the text that we want to analyze.
calais.set('content', 'IronMountain Solutions Inc.,* Huntsville, Alabama, was awarded a $11,465,838 modification (000018) to domestic and foreign military sales (Mexico, Brazil, Tunisia, Saudi Arabia, Slovakia, Thailand, Taiwan, Afghanistan, United Arab Emirates, and Sweden) contract W31P4Q-17-A-0001 for support services for the Utility Helicopter Project Office. Work will be performed in Huntsville, Alabama, with an estimated completion date of May 13, 2019  Fiscal 2018 other procurement, Army; foreign military sales; and research, development, test and evaluation funds in the combined amount of $11,465,838 were obligated at the time of the award. U.S. Army Contracting Command, Redstone Arsenal, Alabama, is the contracting activity');


calais.extractFromText(function(result, err) {     //perform the request
    if (err) {
        console.log('Uh oh, we got an error! : ' + err);
        return;
    }

    eval(require("locus"))
});