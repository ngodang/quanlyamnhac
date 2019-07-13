import React, { Component } from 'react'
import MediaPlayer from './MediaPlayer'
import { Link } from 'react-router-dom'
import './main.scss'
import url from '../../url'
import QuanTam from './Quantam.jsx';

const mod = (num, max) => ((num % max) + max) % max

class Playlist extends Component {

  _handleTrackClick(track) {
    this.props.onTrackClick(track)
  }

  componentWillMount() {
    let track = this.props.tracks[0];
    this.props.onTrackClick(track);
  }

  render() {
    const { tracks, currentTrack } = this.props
    console.log(tracks)
    return (
      <aside className="media-playlist">
        <header className="media-playlist-header">
          <h3 className="media-playlist-title">Danh Sách Phát</h3>
        </header>
        <ul className="media-playlist-tracks">
          {tracks.map((track, index) => (
            <li
              key={index}
              className={`media-playlist-track ${
                track === currentTrack ? 'is-active' : ''
                }`}
              onClick={this._handleTrackClick.bind(this, track)}
            >
              {track.songname} - ({track.artistshow.map((e, int) => {
                if (int === track.artistshow.length - 1) {
                  return e.artistname;
                } else {
                  return e.artistname + " - ";
                }
              })})
            </li>
          ))}
        </ul>
      </aside>
    )
  }
}

class AutoPlayLists extends Component {
  state = {
    currentTrack: { filepathsong: null, songimage: null, songname: " ", artistshow: [], artists: [] },
    repeatTrack: false,
    autoPlay: true,
    playlists: [],
    title: "",
    playlistorder: [],
    isLoai: 0
  }

  componentWillMount() {
    let { playlists, playlistname, path, isLoai } = this.props.location.state;
    this.setState({
      title: playlistname,
      playlists: playlists,
      isLoai: isLoai
    });

    fetch(url + path)
      .then(response => response.json())
      .then(data => {
          this.setState({ playlistorder: data.data })
        });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.isCheck) {
      window.location.reload();
    }
  }

  _handleTrackClick = track => {
    this.setState({ currentTrack: track })
  }

  _navigatePlaylist = direction => {
    const newIndex = mod(
      this.state.playlists.indexOf(this.state.currentTrack) + direction,
      this.state.playlists.length
    )
    this.setState({ currentTrack: this.state.playlists[newIndex] })
  }

  render() {
    const { currentTrack, repeatTrack, autoPlay, playlists } = this.state
    const i = currentTrack.artistshow.length;

    return (
      <div className="container">
        <div className="row media-player-wrapper">
          <div className="playlist-title">
            {this.state.title}
          </div>
          <MediaPlayer
            ref={c => (this._mediaPlayer = c)}
            src={currentTrack.filepathsong}
            autoPlay={autoPlay}
            loop={repeatTrack}
            srcimage={currentTrack.songimage}
            currentTrack={currentTrack.songname}
            repeatTrack={repeatTrack}
            onPrevTrack={() => this._navigatePlaylist(-1)}
            onNextTrack={() => this._navigatePlaylist(1)}
            onRepeatTrack={() => {
              this.setState({ repeatTrack: !repeatTrack })
            }}
            onPlay={() => !autoPlay && this.setState({ autoPlay: true })}
            onPause={() => this.setState({ autoPlay: false })}
            onEnded={() => !repeatTrack && this._navigatePlaylist(1)}
          />
          <Playlist
            tracks={playlists}
            currentTrack={currentTrack}
            onTrackClick={this._handleTrackClick}
          />
        </div>
        <div className="row media-player-wrapper">
          <div className="thongtinbaihat">
            <div className="thongtinbaihat-header">
              <p>Bài hát: {currentTrack.songname}</p>
              <span>Trình bày: {currentTrack.artistshow.map((e, int) => {
                if (int === i - 1) {
                  return e.artistname;
                } else {
                  return e.artistname + " - ";
                }
              })}
              </span><br></br>
              <span>Sáng tác: {currentTrack.artists.artistname}</span>
            </div>
            <div className="thongtinbaihat-conten">
              <p className="loibaihat">LỜi bài hát</p>
              {currentTrack.lyrics}
            </div>
          </div>
          <div className="listbaihat">
            <p>Có thể bạn quan tâm ></p>
            <QuanTam playlistorder={this.state.playlistorder} check = {this.state.isLoai}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AutoPlayLists;
