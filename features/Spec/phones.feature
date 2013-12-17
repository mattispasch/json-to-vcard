# language: en
Feature: Convert JSON-Contacts with phone-numbers to vCard


Scenario: Convert a JSON contact with a name and a single phone-number to a vCard
	Given the following JSON-Contact:
	"""
	{
		"name": "Max",
		"phones": [
			{
				"label": "Mobile",
				"number": "+49 1234"
			}
		]
	}
	"""
	When I convert the JSON to vCard
	Then I'll get the following vCard:
	"""
BEGIN:VCARD
VERSION:4.0
FN:Max
TEL;TYPE=Mobile:+49 1234
END:VCARD
	"""
	
	
Scenario: Convert a JSON contact with a name and two phone-numbers to a vCard
	Given the following JSON-Contact:
	"""
	{
		"name": "Max",
		"phones": [
			{
				"label": "Mobile",
				"number": "+49 1234"
			},
			{
				"label": "Work",
				"number": "+49 4321"
			}
		]
	}
	"""
	When I convert the JSON to vCard
	Then I'll get the following vCard:
	"""
BEGIN:VCARD
VERSION:4.0
FN:Max
TEL;TYPE=Mobile:+49 1234
TEL;TYPE=Work:+49 4321
END:VCARD
	"""
	
Scenario: Convert a JSON contact with a name and a phone-number without label to a vCard
	Given the following JSON-Contact:
	"""
	{
		"name": "Max",
		"phones": [
			{
				"number": "+49 1234"
			}
		]
	}
	"""
	When I convert the JSON to vCard
	Then I'll get the following vCard:
	"""
BEGIN:VCARD
VERSION:4.0
FN:Max
TEL:+49 1234
END:VCARD
	"""
	
