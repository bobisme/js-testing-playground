import { applyMiddleware, createStore } from 'redux'
import sagaMiddleware from 'redux-saga'

export function setupStoreAndDispatched() {
  // store the dispatched actions
  const dispatched = []
  // set up mock environment
  const middleware = sagaMiddleware()
  const reducer = (store, action) => {
    dispatched.push(action)
    return {}
  }
  const store = applyMiddleware(middleware)(createStore)(reducer)
  return { store, dispatched, middleware }
}
