import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .forEach(prop => {
      let descriptor = Object.getOwnPropertyDescriptor(src, prop)
      Object.defineProperty(target, prop, descriptor)
    })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
copyProps(window, global)
