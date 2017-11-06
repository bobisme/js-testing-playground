import { expect } from 'chai'
import sinon from 'sinon'
import '../spec-helper'
import { setupStoreAndDispatched } from '../saga-helper'

import { ArtistFormSagas } from 'sagas/artist-form'

describe('ArtistFormSagas', function() {
  describe('#submit', function() {
    it('requests the artists from the action', function() {
      let root = new ArtistFormSagas()
      let action = { type: 'SUBMIT_ARTIST', name: 'Beck' }
      let gen = root.submit()(action)
      expect(gen.next().value).to.have.property('CALL')
        .which.has.property('args')
        .which.deep.equals(['Beck'])
    })
  })
})

describe('saga integration', function() {
  describe('submitting the form', function() {
    it('requests the artist', function() {
      let { store, middleware } = setupStoreAndDispatched()
      let getArtist = sinon.spy()
      let rootSaga = new ArtistFormSagas()
      rootSaga.artistRequests = { getArtist }
      middleware.run(rootSaga.saga())
      store.dispatch({ type: 'SUBMIT_ARTIST', name: 'Chiodos' })
      expect(getArtist).to.have.been.calledWith('Chiodos')
    })
  })
})
