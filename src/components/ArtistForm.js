import React from 'react'
import { connect } from 'react-redux'

export class ArtistForm extends React.Component {
  handleArtistChange = (ev) => {
    this.setState({ artist: ev.target.value })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.dispatch({ type: 'SUBMIT_ARTIST', name: this.state.artist })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="artist" type="text" onChange={this.handleArtistChange} />
        <button type="submit">Get Artist</button>
      </form>
    )
  }
}

export default connect(
  state => state,
)(ArtistForm)
