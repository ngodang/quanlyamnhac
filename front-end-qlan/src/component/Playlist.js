import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

class Playlist extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {

        let items = this.props.items;

        return (
            <div className="container">
                <div className="row">
                    {items.map(item => (
                        <div className="col-md-2 col-sm-3" key={item.playlistId}>
                            <Link to={{ pathname: '/playlist', state: { playlists: item.song, playlistname: item.playlistname, isCheck: true, path: 'playlist/findrandom', isLoai: 1}}} className="nav-link">
                                <img src={item.playlistimage} alt="Lights" style={{ width: '100%', height: '150px' }} />
                                <p><span>{item.playlistname}</span></p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default Playlist