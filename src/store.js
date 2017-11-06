import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { ArtistFormSagas } from 'sagas/artist-form'
import reducer from 'reducers/artist-form'

function devToolsMiddleware() {
  if (typeof window !== 'undefined' && window.devToolsExtension) {
    return window.devToolsExtension()
  }
  return f => f
}

export function configureStore() {
  let sagaMiddleware = createSagaMiddleware()
  let store = createStore(
    // combineReducers(reducers),
    reducer,
    { filters: {} },
    compose(
      applyMiddleware(sagaMiddleware),
      devToolsMiddleware(),
    )
  )

  sagaMiddleware.run(new ArtistFormSagas().saga())

  return store
}
