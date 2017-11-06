Feature: The artist page
  Scenario: Entering an artist
    Given I am on the artist page
    When I search for "Meshuggah"
    Then I should see the result for Meshuggah
