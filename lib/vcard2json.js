var assert = require('assert');
var vCardLib = require("./external/vcard.js");

function parse(vcard) {
	var lines = vcard.split("\n");
	assert.equal(lines[0], "BEGIN:VCARD", "vCard MUST start with BEGIN:VCARD: " + lines[0]);
	assert.equal(lines[lines.length - 1], "END:VCARD", "vCard MUST start with END:VCARD: " + lines[lines.length - 1]);

	var parsedLines = [];

	lines.forEach(function(line) {

		parsedLines.push({

		});
	});

	return parsedLines;
};

var parser = {

	parsed: null,
	labelForItem : null,
	
	buildItemLabelMap : function() {
		var parsed = this.parsed;
		this.labelForItem = {};
		
		for ( var key in parsed['x-ablabel']) {
			for ( var i in parsed['x-ablabel'][key]) {
				var o = parsed['x-ablabel'][key][i];
				if (o.item && o.value) {
					this.labelForItem[o.item] = o.value;
				}
			}
		}
	},

	addProp : function(prop, addFn) {
		var parsed = this.parsed;
		for ( var key in parsed[prop]) {
			if (key === 'default') {
				for ( var i in parsed[prop]['default']) {
					var label = this.labelForItem[parsed[prop]['default'][i].item];
					addFn(undefined, label, parsed[prop]['default'][i].value);
				}
			} else {
				assert(key.substr(0, 5) == "type=", "Expected email key to start with 'type=', key: " + key);
				var type = key.substr(5);
				for ( var i in parsed[prop][key]) {
					var label = this.labelForItem[parsed[prop][key][i].item];
					addFn(type, label, parsed[prop][key][i].value);

				}
			}
		}
	},
}
exports.vcard2json = function(vcard) {
	var parsed = vCard.initialize(vcard);
	console.log(JSON.stringify(parsed));

	parser.parsed = parsed;
	parser.buildItemLabelMap();

	var json = {};

	if (parsed.fn) {
		json.name = parsed.fn;
	}
	if (parsed.nickname) {
		// we expect only one
		json.nickname = parsed.nickname['default'][0].value
	}
	if (parsed.note) {
		// we expect only one
		json.notes = json.notes || [];
		json.notes.push({
			text : parsed.note['default'][0].value
		});
	}
	if (parsed.adr) {
		json.postalAddresses = [];
		parser.addProp('adr', function(type,label, value) {
			var a = value[0];
			var addressString = a[2] + "\n" + a[3] + " " + a[5];
			json.postalAddresses.push({
				type : type,
				address : addressString
			});			
		});
	}
	if (parsed.tel) {
		json.phones = [];
		parser.addProp('tel', function(type, label, value) {
			json.phones.push({
				type: type,
				label: label,
				number: value
			});
		});
	}

	if (parsed.email) {
		json.emails = [];
		parser.addProp('email', function(type, label, value) {
			json.emails.push({
				label : label,
				type : type,
				address : value
			});
		});
	}
	if (parsed.url) {
		json.urls = [];
		parser.addProp('url', function(type,label,value) {
			json.urls.push({
				type : type,
				label : label,
				url : value
			});
		});
	}

	return json;
};