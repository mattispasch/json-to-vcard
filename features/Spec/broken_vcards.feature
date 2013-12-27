# language: en
Feature: when called with broken vcards, conversion should fail

Scenario: vCard without begin
	Given the following vCard:
	"""
VERSION:3.0
FN:Max Mustermann
END:VCARD
	"""
	When I try to convert the vCard to JSON
	Then an exception is thrown
	
Scenario: vCard without end
	Given the following vCard:
	"""
BEGIN:VCARD
VERSION:3.0
FN:Max Mustermann
	"""
	When I try to convert the vCard to JSON
	Then an exception is thrown