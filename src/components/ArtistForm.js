import React from 'react'

export class ArtistForm extends React.Component {
  handleArtistChange = (ev) => {
    this.setState({ artist: ev.target.value })
  }

  handleSubmit = () => {
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
