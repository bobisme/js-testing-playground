import React from 'react'
import { expect } from 'chai'
import { shallow } from '../enzyme-helper'

import { Artist } from 'components/Artist'

describe('Artist', function() {
  it('renders the artist name from the name prop', function() {
    let wrapper = shallow(<Artist artist={{ name: 'Rammstein' }}/>)
    expect(wrapper.text()).to.contain('Rammstein')
  })
})
