import { getArtist } from 'lib/artist-requests'

export class SubmitForm {
  constructor(store) {
    this.store = store
    this.getArtist = getArtist
  }

  thunk(artistName) {
    return (dispatch) => {
      this.getArtist(artistName).then((artist) => {
        this.store.dispatch(
          { type: 'GET_ARTIST', payload: artist }
        )
      })
    }
  }
}
