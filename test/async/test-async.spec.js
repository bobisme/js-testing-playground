import { expect } from '../spec-helper'

describe('promise test', function() {
  it('requires the promise to be returned', function() {
    return Promise.resolve('hello').then((value) => {
      expect(value).to.equal('hello')
    })
  })
})

describe('async test', function() {
  async function asyncFunction() {
    return Promise.resolve('hello')
  }

  it('requires the promise to be returned if no "await"', async function() {
    return Promise.resolve('hello').then((value) => {
      expect(value).to.equal('hello')
    })
  })

  it('can await promises', async function() {
    await Promise.resolve('hello').then((value) => {
      expect(value).to.equal('hello')
    })
  })

  it('tests like synchronous code', async function() {
    let value = await Promise.resolve('hello')
    expect(value).to.equal('hello')
  })

  it('tests async functions', async function() {
    let value = await asyncFunction()
    expect(value).to.equal('hello')
  })
})
