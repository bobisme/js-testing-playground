require('nightwatch-cucumber')({
})

let port = parseInt(process.env.PORT || '4444', 10)

module.exports = {
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    port: port,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.gecko.driver': '',
      'webdriver.edge.driver': '',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: port,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
}
