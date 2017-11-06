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

const mockRequest = {
  getArtist: function() {
    return Promise.resolve({ name: 'Chiodos' })
  },
}

describe('saga integration', function() {
  describe('submitting the form', function() {
    it('requests the artist', function() {
      let { store, dispatched, middleware } = setupStoreAndDispatched()
      let rootSaga = new ArtistFormSagas()
      rootSaga.artistRequests = mockRequest
      middleware.run(rootSaga.saga())
      let action = { type: 'SUBMIT_ARTIST', name: 'Chiodos' }
      store.dispatch(action)
      return Promise.resolve(1).then(() => {
        expect(dispatched).to.deep.equal([
          { type: '@@redux/INIT' },
          { type: 'SUBMIT_ARTIST', name: 'Chiodos' },
          { type: 'GET_ARTIST', payload: { name: 'Chiodos' } },
        ])
      })
    })
  })
})
