import request from 'superagent'

export function getArtist(name) {
  return new Promise((resolve, reject) => {
    let url = `https://rest.bandsintown.com/artists/${name}?app_id=artistsinarea`
    request.get(url).accept('json').then((res) => {
      resolve(res.body)
    }, () => {
      // The response is a status 200, but the JSON is malformed.
      resolve(null)
    })
  })
}
