import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Artist } from 'components/Artist'

describe('Artist', function() {
  it('renders the artist name from the name prop', function() {
    let wrapper = shallow(<Artist name="Between The Buried And Me" />)
    expect(wrapper.text()).to.contain('Between The Buried And Me')
  })
})
