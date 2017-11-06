import React from 'react'

import { mountPage } from 'lib/mountPage'
import { ArtistForm } from 'components/ArtistForm'

const Home = () => (
  <div>
    <h1>ARTISTS IN AREA!!!</h1>
    <ArtistForm />
  </div>
)

mountPage(module, Home)
