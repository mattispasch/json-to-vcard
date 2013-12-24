var jsonEquals = function(x, y) {
	// reduce errors:
	x = JSON.parse(JSON.stringify(x));
	y = JSON.parse(JSON.stringify(y));

	// compare
	var p;
	for (p in y) {
		if (typeof (x[p]) == 'undefined') {
			error("[JSON not equal] x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
			return false;
		}
	}

	for (p in y) {
		if (y[p]) {
			switch (typeof (y[p])) {
			case 'object':
				if (!jsonEquals(y[p],x[p])) {
					error("[JSON not equal] 2x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
					return false;
				}
				break;
			case 'function':
				if (typeof (x[p]) == 'undefined' || (p != 'equals' && y[p].toString() != x[p].toString()))
					error("[JSON not equal] 3x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
					return false;
				break;
			default:
				if (y[p] != x[p]) {
					error("[JSON not equal] 4x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
					return false;
				}
			}
		} else {
			if (x[p]) {
				error("[JSON not equal] 5x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
				return false;
			}
		}
	}

	for (p in x) {
		if (typeof (y[p]) == 'undefined') {
			error("[JSON not equal] 6x['" + p + "'] = " + x[p] + ", y['" + p + "'] = " + y[p]);
			error("Types: y[p]: " + typeof y[p] + " x[p]: " + typeof x[p]);
			return false;
		}
	}

	return true;
}

const debug = true;

function log(s) {
	if(debug) {
		console.log(s);
	}
}

function error(s) {
	if(debug) {
		console.error(s);
	}
}

var contactSteps = function() {
	this.World = require("../support/world.js").World; // overwrite default

	this.Given(/^the following JSON\-Contact:$/, function(jsonString, callback) {
		this.json = JSON.parse(jsonString);
		callback();
	});

	this.Given(/^the following vCard:$/, function(vcard, callback) {
		this.vcard = vcard;
		callback();
	});

	this.When(/^I convert the JSON to vCard$/, function(callback) {
		this.vcard = this.json2vcard(this.json);
		callback();
	});

	this.When(/^I convert the vCard to JSON$/, function(callback) {
		try {
			this.json = this.vcard2json(this.vcard);
			callback();
		} catch (e) {
			throw e;
			var err = "Conversion failed: " + e;
			error(err)
			callback(err);
		}
	});

	this.Then(/^I'll get the following vCard:$/, function(vcard, callback) {
		if (this.vcard !== vcard) {
			const
			err = "vCards did not match, actual: " + this.vcard + " Expected: " + vcard;
			error(err);
			callback(err);
		} else {
			log("vcard correct.");
			callback();
		}
	});

	this.Then(/^I'll get the following JSON:$/, function(jsonString, callback) {
		var json;
		try {
			json = JSON.parse(jsonString);
		} catch (e) {
			callback("JSON not correct. Error: " + e + "\nString:\n" + jsonString);
			return;
		}
		if (this.json == json) {
			log("json correct. (==)");
			callback();
		} else if(jsonEquals(this.json, json)) {
			log("json correct. (equal content)");
			callback();
		} else {
			var err = "JSON did not equal. Was:\n" + JSON.stringify(this.json, null, 2) + "\nExpected:\n" + jsonString;
			error(err);
			callback(err);
		}
	});
};

module.exports = contactSteps;
