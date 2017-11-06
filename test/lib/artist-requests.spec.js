import { expect } from 'chai'

import { getArtist } from 'lib/artist-requests'

describe('getArtist', function() {
  it('promises to return the artist', function() {
    return getArtist('Meshuggah').then((artist) => {
      expect(artist.name).to.equal('Meshuggah')
    })
  })

  it('prmises to return null if it cannot get the artist', function() {
    return getArtist('ASLKDJKjjskjkdjsijoijlk').then((artist) => {
      expect(artist).to.equal(null)
    })
  })
})
