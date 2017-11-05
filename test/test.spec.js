import { expect } from 'chai'

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
