var World = function World(callback) {
	this.converter = require("../../lib/json2vcard.js");
	callback();
};
exports.World = World;