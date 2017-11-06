const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Given, Then, When }) => {
  Given('I am on the artist page', function() {
    return client
      .url('http://127.0.0.1:3010/')
      .waitForElementVisible('body', 1000)
  })

  When('I search for {string}', function(string) {
    return client
      .setValue('input[name="artist"]', string)
      .click('button[type="submit"]')
      .pause(1000)
  })

  Then('I should see the result for Meshuggah', function() {
    return client.assert.containsText('.artist .name', 'Meshuggah')
  })
})
