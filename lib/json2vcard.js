exports.json2vcard = function(json) {
	// start
	var rows = new Array();
	rows.push("BEGIN:VCARD");
	rows.push("VERSION:4.0");

	// name
	if (json.name) {
		rows.push("FN:" + json.name);
	}

	// telephone:
	if (json.phones) {
		for ( var i = 0; i < json.phones.length; i++) {
			var item = json.phones[i];
			if (item.label) {
				rows.push("TEL;TYPE=" + item.label + ":" + item.number);
			} else if (item.number) {
				rows.push("TEL:" + item.number);
			}
		}
	}
	
	// emails:
	if (json.emails) {
		for ( var i = 0; i < json.emails.length; i++) {
			var item = json.emails[i];
			rows.push("EMAIL:" + item.address);
		}
	}
	

	// end
	rows.push("END:VCARD");
	return rows.join("\n");
}