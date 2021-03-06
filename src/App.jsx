import React, { Component } from 'react';
import './App.css';
import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    //console.log(this.state.query);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0]
      this.setState({artist: artist});
      //console.log('artist', artist);
      FETCH_URL =`${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        //console.log('top tracks', json);
        const tracks = json.tracks;
        this.setState({tracks: tracks})
      })
    })
  }


  render () {
    return (
      <div className='App'>
        <div className='App-title'>Music Master from App</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Search for an Artist'
              value={this.state.query}
              onChange={event => {
                this.setState({
                  query: event.target.value
                })
              }}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph='search'></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
            ? <div>
                <Profile
                  artist={this.state.artist}
                />
                <Gallery
                  tracks={this.state.tracks}
                />
              </div>
            : <div></div>
        }
      </div>
    )
  }
}

export default App;
