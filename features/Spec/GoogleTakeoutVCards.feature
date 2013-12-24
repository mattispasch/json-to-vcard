# language: en
Feature: Convert vCards from Google Takeout to JSON-Contacts

Scenario: Contact just has a name
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Max Mustermann
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Max Mustermann"
	}
	"""	


Scenario: Contact just has a phone number
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Max Mustermann
N:Mustermann;Max;;;
TEL;TYPE=CELL:0162952338423
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Max Mustermann",
		"phones": [
			{
				"type": "cell",
				"number": "0162952338423"
			}
		]
	}
	"""	

Scenario: Contact just has a mail-address
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Mattis Pasch
N:Pasch;Mattis;;;
EMAIL;TYPE=INTERNET;TYPE=HOME:abc@example.org
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Mattis Pasch",
		"emails": [
			{
				"type": "home",
				"address": "abc@example.org"
			}
		]
	}
	"""	
	
	
Scenario: Contact has two phone numbers
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Max Mustermann
N:Mustermann;Max;;;
TEL;TYPE=CELL:0162952338423
TEL;TYPE=HOME:+492384739399
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Max Mustermann",
		"phones": [
			{
				"type": "cell",
				"number": "0162952338423"
			},
			{
				"type": "home",
				"number": "+492384739399"
			}
		]
	}
	"""	
	
Scenario: Contact just has an address
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Deutscher Bundestag
ADR;TYPE=HOME:;;Platz der Republik 1;Berlin;;11011;
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Deutscher Bundestag",
		"postalAddresses": [
			{
				"type": "home",
				"address":"Platz der Republik 1\nBerlin 11011"
			}
		]
	}	
	"""	
	
Scenario: Contact just two custom labeled numbers
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Karl Kontakt
item1.TEL:1234567890
item1.X-ABLabel:Kontonummer
item2.TEL:33333333
item2.X-ABLabel:Altes Handy
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Karl Kontakt",
		"phones": [
			{
				"label": "Kontonummer",
				"number": "1234567890"
			},
			{
				"label": "Altes Handy",
				"number": "33333333"
			}
		]
	}	
	"""	
	
Scenario: Contact just has a note with escaped characters
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Someone
NOTE:<HTCData><Facebook>id\:10000061234566/friendof\:1234565</Facebook></HTCData>
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Someone",
		"notes": [
			{
				"text" : "<HTCData><Facebook>id:10000061234566/friendof:1234565</Facebook></HTCData>"
 			}
		]
	}
	"""	
	
Scenario: Contact just has a note with a nickname
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Someone
NICKNAME:Katzenmami
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Someone",
		"nickname":"Katzenmami"
	}
	"""
	
Scenario: Contact with an URL
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Someone Else
URL:http\://www.google.com/profiles/1234123412341234
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"name": "Someone Else",
		"urls": [
			{ 
				"url":"http://www.google.com/profiles/1234123412341234"
			}
		]
	}
	"""
	
Scenario: Contact with custom labeled and typed E-Mail and labeled url
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
EMAIL;TYPE=INTERNET:email1@test.de
item1.EMAIL;TYPE=INTERNET:email2@test.de
item1.X-ABLabel:Obsolete
item2.URL:http\://www.google.com/profiles/1234123412341234
item2.X-ABLabel:PROFILE
END:VCARD
	"""
	When I convert the vCard to JSON
	Then I'll get the following JSON:
	"""
	{
		"emails" : [
			{
				"type":"internet",
				"address" : "email1@test.de"
			},
			{
				"label":"Obsolete",
				"type": "internet",
				"address" : "email2@test.de"
			}
		],
		"urls": [
			{
				"label" : "PROFILE", 
				"url":"http://www.google.com/profiles/1234123412341234"
			}
		]
	}
	"""
	