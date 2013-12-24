# language: en
Feature: Convert JSON-Contacts with phone-numbers to vCard


Scenario: Convert a JSON contact with a name and a single email-address to a vCard (ignores Labels)
	Given the following JSON-Contact:
	"""
	{
		"name": "Peter",
		"emails": [
			{
				"label": "Work",
				"address": "abc@example.org"
			}
		]
	}
	"""
	When I convert the JSON to vCard
	Then I'll get the following vCard:
	"""
BEGIN:VCARD
VERSION:4.0
FN:Peter
EMAIL:abc@example.org
END:VCARD
	"""
	
	
Scenario: Convert a JSON contact with a name and two phone-numbers to a vCard
	Given the following JSON-Contact:
	"""
	{
		"name": "Max",
		"emails": [
			{
				"label": "Work",
				"address": "abc@example.org"
			},
			{
				"address": "def@example.org"
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
EMAIL:abc@example.org
EMAIL:def@example.org
END:VCARD
	"""	
	