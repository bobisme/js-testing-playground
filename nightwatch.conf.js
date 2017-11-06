const path = require('path')

require('nightwatch-cucumber')({})

const BINPATH = './node_modules/nightwatch/bin'

let seleniumPort = parseInt(process.env.SELENIUM_PORT || '4444', 10)

// check that the selenium jar and chromedriver are available
require('fs').stat(`${BINPATH}/selenium.jar`, function(err, stat) {
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error)
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH)
    })
  }
})

const firefox = {
  desiredCapabilities: {
    browserName: 'firefox',
    marionette: true,
  },
}
const chrome = {
  desiredCapabilities: {
    browserName: 'chrome',
  },
}
const headlessChrome = {
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu'],
    },
  },
}
const edge = {
  desiredCapabilities: {
    browserName: 'MicrosoftEdge',
  },
}

module.exports = {
  output_folder: 'reports',
  // custom_commands_path: '',
  // custom_assertions_path: '',
  // page_objects_path: '',
  // globals_path: '',

  selenium: {
    start_process: true,
    // start_session: true,
    server_path: `${BINPATH}/selenium.jar`,
    // log_path: '',
    host: '127.0.0.1',
    port: seleniumPort,
    cli_args: {
      'webdriver.chrome.driver': path.resolve(`${BINPATH}/chromedriver`),
      // 'webdriver.gecko.driver': '',
      // 'webdriver.edge.driver': '',
    },
  },

  test_settings: {
    default: {
      // launch_url: 'http://localhost:3010',
      // selenium_port: 4444,
      // selenium_host: '127.0.0.1',
      silent: true,
      screenshots: {
        enabled: false,
        // path: '',
      },
      desiredCapabilities: headlessChrome.desiredCapabilities,
    },
    firefox,
    chrome,
    edge,
  },
}
