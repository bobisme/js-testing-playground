import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'

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
})
