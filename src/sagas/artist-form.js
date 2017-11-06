import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as artistRequests from 'lib/artist-requests'

export class ArtistFormSagas {
  constructor() {
    this.artistRequests = artistRequests
  }

  submit() {
    let _this = this
    return function* (action) {
      let res
      res = yield call(_this.artistRequests.getArtist, action.name)
      yield put({ type: 'GET_ARTIST', payload: res })
    }
  }

  saga() {
    let _this = this
    return function* root() {
      yield [
        takeEvery('SUBMIT_ARTIST', _this.submit()),
      ]
    }
  }
}
