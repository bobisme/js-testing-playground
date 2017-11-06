import { expect } from 'chai'

import reducer from 'reducers/artist-form'

describe('artist reducer', function() {
  it('sets .artist from the GET_ARTIST action', function() {
    let action = { type: 'GET_ARTIST', payload: { name: 'Metallica' } }
    let state = reducer({}, action)
    expect(state.artist).to.deep.equal({ name: 'Metallica' })
  })
})
