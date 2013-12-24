var World = function World(callback) {
	this.json2vcard = require("../../lib/json2vcard.js").json2vcard;
	this.vcard2json = require("../../lib/vcard2json.js").vcard2json;
	callback();
};
exports.World = World;