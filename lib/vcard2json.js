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
function buildItemLabelMap(parsed) {
	if(!parsed['x-ablabel']) {
		return {};
	}
	var labelForItem = {};
	
	for(var key in parsed['x-ablabel']) {
		for(var i in parsed['x-ablabel'][key]) {
			var o = parsed['x-ablabel'][key][i];
			if(o.item && o.value) {
				labelForItem[o.item] = o.value;
			}
		}
	}
	return labelForItem;
}
exports.vcard2json = function(vcard) {
	var parsed = vCard.initialize(vcard);
	 console.log(JSON.stringify(parsed));

	var labelForItem = buildItemLabelMap(parsed);
	 
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
		for ( var key in parsed.adr) {
			assert(key.substr(0, 5) == "type=", "Expected address key to start with 'type=', key: " + key);
			var type = key.substr(5);
			for ( var i in parsed.adr[key]) {
				var a = parsed.adr[key][i].value[0];
				var addressString = a[2] + "\n" + a[3] + " " + a[5];
				json.postalAddresses.push({
					type : type,
					address : addressString
				});
			}
		}
	}
	if (parsed.tel) {
		json.phones = [];
		for ( var key in parsed.tel) {
			if (key === 'default') {
				for ( var i in parsed.tel['default']) {
					var label = labelForItem[parsed.tel['default'][i].item];
					json.phones.push({
						label : label,
						number : parsed.tel['default'][i].value
					});
				}
			} else {
				assert(key.substr(0, 5) == "type=", "Expected phone key to start with 'type=', key: " + key);
				var type = key.substr(5);
				for ( var i in parsed.tel[key]) {
					json.phones.push({
						type : type,
						number : parsed.tel[key][i].value
					});
				}
			}
		}
	}
	if (parsed.email) {
		json.emails = [];
		for ( var key in parsed.email) {
			if (key === 'default') {
				for ( var i in parsed.email['default']) {
					var label = labelForItem[parsed.email['default'][i].item];
					json.emails.push({
						label : label,
						address : parsed.email['default'][i].value
					});
				}
			} else {
				assert(key.substr(0, 5) == "type=", "Expected email key to start with 'type=', key: " + key);
				var type = key.substr(5);
				for ( var i in parsed.email[key]) {
					var label = labelForItem[parsed.email[key][i].item];
					json.emails.push({
						label: label,
						type : type,
						address : parsed.email[key][i].value
					});
				}
			}
		}
	}
	if(parsed.url) {
		json.urls = [];
		for ( var key in parsed.url) {
			if (key === 'default') {
				for ( var i in parsed.url['default']) {
					var url = parsed.url['default'][i];
					var label = labelForItem[url.item];
					
					json.urls.push({
						label : label,
						url : url.value
					});
				}
			} else {
				assert(key.substr(0, 5) == "type=", "Expected url key to start with 'type=', key: " + key);
				var type = key.substr(5);
				for ( var i in parsed.url[key]) {
					var label = labelForItem[url.item];
					json.urls.push({
						label : label,
						type : type,
						url : parsed.url[key][i].value
					});
				}
			}
		}
	}

	return json;
};