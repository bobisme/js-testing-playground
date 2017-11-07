import React from 'react'

import { expect, sinon } from '../spec-helper'
import { shallow } from '../enzyme-helper'

import { ArtistForm } from 'components/ArtistForm'

describe('ArtistForm', function() {
  it('should have an input field', function() {
    let component = shallow(<ArtistForm />)
    expect(component.find('input[name="artist"]')).to.have.lengthOf(1)
  })

  it('should have a submit button', function() {
    let component = shallow(<ArtistForm />)
    expect(component.find('button[type="submit"]')).to.have.lengthOf(1)
  })

  it('updates the form state when changing the artist', function() {
    let component = shallow(<ArtistForm />)
    const input = component.find('input[name="artist"]')
    input.simulate('change', { target: { value: 'Primus' } })
    expect(component.state('artist')).to.equal('Primus')
  })

  it('dispatches SUBMIT_ARTIST when the form is submitted', function() {
    let spy = sinon.spy()
    let component = shallow(<ArtistForm dispatch={spy} />)
    component.setState({ artist: 'Primus' })

    component.find('form').simulate('submit', { preventDefault: () => {} })
    expect(spy).to.have.been.calledWith(
      { type: 'SUBMIT_ARTIST', name: 'Primus' })
  })
})
