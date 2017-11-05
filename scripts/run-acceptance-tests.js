#!/usr/bin/env node

const { execSync, spawn } = require('child_process')

const IMAGE = 'selenium/standalone-chrome'
const CONTAINER_NAME = 'chrome'

const log = {
  info: (text) => {
    process.stdout.write(`[35m${text}[0m`)
  },
  error: (text) => {
    process.stderr.write(`[31${text}[0m`)
  },
}

function hasImage() {
  let result = execSync(`docker images -q ${IMAGE} 2> /dev/null`)
  return (result.toString().trim() !== '')
}

function pullImage(callback) {
  log.info(`Pulling image ${IMAGE}...\n`)
  let docker = spawn('docker', ['pull', IMAGE])
  docker.on('error', (err) => {
    process.stderr.write(`Could not pull image: ${err}\n`)
    process.exit(2)
  })
  docker.stdout.on('data', (data) => {
    let lines = data.toString().split('\n')
    process.stdout.write(lines[0])
    if (lines.length <= 1) return
    for (let i = 1; i < lines.length; i++) {
      process.stdout.write(`\n[34mDOCKER[0m: ${lines[i]}`)
    }
  })
  docker.stderr.on('data', (data) => {
    log.error(data)
  })
  docker.on('close', () => {
    log.info(`done.\n`)
    callback()
  })
}

function isContainerRunning() {
  try {
    execSync(`docker inspect -f {{.State.Running}} ${CONTAINER_NAME}`)
    return true
  } catch (err) {
    return false
  }
}

function runContainer() {
  log.info(`Starting ${IMAGE}\n`)
  return execSync(
    `docker run --rm --detach --publish-all --name ${CONTAINER_NAME} ${IMAGE}`)
}

function dockerPort() {
  let result = execSync(`docker port ${CONTAINER_NAME} 4444`)
  let [host, port] = result.toString().trim().split(':')
  if (port.trim() === '') throw new Error('invalid port')
  return { host, port }
}

function onceRunning(callback, timeout = 2000, retries = 30) {
  let interval = null
  let tries = 0

  function grepLogs() {
    if (interval == null) return null
    if (tries >= retries) throw new Error('retries exceeded. not running')

    try {
      log.info(execSync(`docker logs ${CONTAINER_NAME} | grep 'Selenium Server is up'`))
    } catch (err) {
      tries += 1
      return
    }

    clearInterval(interval)
    callback()
  }
  interval = setInterval(grepLogs, timeout)
}

function stopContainer() {
  log.info('stopping container.\n')
  try {
    execSync(`docker stop ${CONTAINER_NAME}`)
  } catch (err) {
    process.stderr.write(`couldn't stop: ${err}\n`)
  }
}

function runTests(host, port) {
  return () => {
    log.info(`I'M RUNNING TESTS NOW... ${host}:${port}\n`)
    let tests = spawn('env', [
      `HOST=${host}`, `PORT=${port}`,
      './node_modules/.bin/nightwatch',
      '--retries', '4', '-c', 'nightwatch.conf.js',
    ])
    tests.stdout.on('data', data => process.stdout.write(data))
    tests.stderr.on('data', data => process.stderr.write(data))
    tests.on('error', err => process.stderr.write(err))
    tests.on('close', stopContainer)
  }
}

function main() {
  function runContainerForTests() {
    if (!isContainerRunning()) runContainer()
    let { host, port } = dockerPort()
    onceRunning(runTests(host, port))
  }

  if (!hasImage()) {
    pullImage(runContainerForTests)
  } else {
    runContainerForTests()
  }
}

main(process.argv)
