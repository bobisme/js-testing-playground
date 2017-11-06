import React from 'react'
import { connect } from 'react-redux'

export const Artist = ({ artist }) => {
  if (artist == null) return null
  return (
    <div className="artist">
      <h2 className="name">{artist.name}</h2>
      <hr />
      <img src={artist.image_url} />
    </div>
  )
}

export default connect(
  state => ({ artist: state.artist })
)(Artist)
