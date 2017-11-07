import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'
import 'babel-polyfill'

const ROOT_ELEMENT_ID = 'app'
let store = null

function getAppElement(id = ROOT_ELEMENT_ID) {
  let element = document.getElementById(id)
  if (element == null) {
    element = document.createElement(id)
    element.id = id
    document.body.appendChild(element)
  }
  return element
}

function render(Component, element) {
  // <BrowserRouter>
  //   <Component />
  // </BrowserRouter>
  ReactDOM.render(<Component />, element)
}

function renderProvider(Component, element) {
  ReactDOM.render((
    <Provider store={store}>
      <Component />
    </Provider>
  ), element)
}

function loadStore() {
  if (store != null) return
  store = require('../store').configureStore()
}

export function mountPage(
  pageModule, Component, options = {},
) {
  let id = options.id || ROOT_ELEMENT_ID
  let withStore = (options.withStore === true)
  if (withStore) loadStore()

  // If there is no document, we're in node, so just pass through.
  if (typeof document === 'undefined') { return Component }

  function renderComponent() {
    if (withStore) {
      renderProvider(Component, getAppElement(id))
    } else {
      render(Component, getAppElement(id))
    }
  }

  if (pageModule.hot) {
    pageModule.hot.accept()
    renderComponent()
  }

  return Component
}

// example:
//   @mount(module)
//   export default class Home extends React.Component {
//     ...
export function mount(pageModule, id = ROOT_ELEMENT_ID) {
  return component => mountPage(pageModule, component, id)
}
