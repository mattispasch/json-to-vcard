# language: en
Feature: Convert a simple JSON contact with a name to a vCard 


Scenario: Convert a simple JSON contact with a name to a vCard
	Given the following JSON-Contact:
	"""
	{
		"type": "contact",
		"name": "Max Mustermann"
	}
	"""
	When I convert the JSON to vCard
	Then I'll get the following vCard:
	"""
BEGIN:VCARD
VERSION:4.0
FN:Max Mustermann
END:VCARD
	"""