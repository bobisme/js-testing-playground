import React from 'react'

import { mountPage } from 'lib/mountPage'
import ArtistForm from 'components/ArtistForm'
import Artist from 'components/Artist'

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>ARTISTS IN AREA!</h1>
        <ArtistForm />
        <Artist />
      </div>
    )
  }
}

mountPage(module, Home, { withStore: true })
