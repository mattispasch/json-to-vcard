var contactSteps = function() {
	this.World = require("../support/world.js").World; // overwrite default
	
	
	this.Given(/^the following JSON\-Contact:$/, function(jsonString, callback) {
		this.json = JSON.parse(jsonString);
		callback();
	});

	this.When(/^I convert the JSON to vCard$/, function(callback) {
		this.vcard = this.converter.json2vcard(this.json);
		callback();
	});

	this.Then(/^I'll get the following vCard:$/, function(vcard, callback) {
		if(this.vcard !== vcard) {
			const err = "vCards did not match, actual: " + this.vcard + " Expected: "  + vcard;
			console.error(err);
			callback(err);
		} else {
			console.log("vcard correct.");
			callback();
		}
	});

};

module.exports = contactSteps;
