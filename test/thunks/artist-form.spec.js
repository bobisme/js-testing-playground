import { sinon, expect } from '../spec-helper'

import { SubmitForm } from 'thunks/artist-form'

describe('Actions', function() {
  describe('#action', function() {
    it('is a thunk that takes the artist name', function() {
      let dispatch = sinon.spy()
      let submitForm = new SubmitForm({ dispatch })
      submitForm.getArtist = () => Promise.resolve({ name: 'BoB' })
      submitForm.thunk('BoB')(dispatch)
      return Promise.resolve(1).then(() => {
        expect(dispatch).to.have.been.calledWith(
          { type: 'GET_ARTIST', payload: { name: 'BoB' } }
        )
      })
    })
  })
})
