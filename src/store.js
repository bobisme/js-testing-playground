import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { ArtistFormSagas } from 'sagas/artist-form'
import reducer from 'reducers/artist-form'

function devToolsMiddleware() {
  if (typeof window !== 'undefined' && window.devToolsExtension) {
    return window.devToolsExtension()
  }
  return x => x
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

  if (module.hot) {
    module.hot.accept('reducers/artist-form', () =>
      store.replaceReducer(require('reducers/artist-form').default)
    )
  }

  return store
}
