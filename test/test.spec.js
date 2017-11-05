/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import request from 'superagent'

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(4)).to.equal(-1)
    })
  })
})

describe('dom stuff', function() {
  it('has a body', function() {
    expect(window.document.getElementsByTagName('body').length).to.equal(1)
  })
})

describe('requests', function() {
  it('works', function() {
    let req = request.get('https://httpbin.org/ip')
    return req.then((response) => {
      expect(response.statusCode).to.equal(200)
      expect(response.body.origin).not.to.be.null
    })
  })
})
