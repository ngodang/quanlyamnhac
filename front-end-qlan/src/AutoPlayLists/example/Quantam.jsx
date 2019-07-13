import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuanTam extends Component {

    render() {

        let items = this.props.playlistorder;
        let check = this.props.check;

        return (
            <div>
                {items.map((item, index) => (
                    <Link key={index} to={{ pathname: check == 2 ? '/nghesi/thongtinnghesi' : '/playlist', state: check == 2 ? item : { playlists: check == 1 ? item.song : [item], playlistname: check == 1 ? item.playlistname : '', isCheck: true, isLoai: check == 1 ? 1 : 0, path: check == 1 ? 'playlist/findrandom' : 'baihat/findrandom?songId=' + item.songId } }} className="nav-link">
                        <div className="col-sm-12 baihat">
                            <div className="col-sm-3 imagebaihat">
                                <img src={check == 1 ? item.playlistimage : check == 0 ? item.songimage : item.image}
                                    alt="" style={{ 'height': '80px', 'width': '100%' }} />
                            </div>
                            <div className="col-sm-9 namebaihat">
                                {check == 1 ? item.playlistname : check == 0 ? item.songname : item.artistname}<br></br>
                                {check == 1 || check == 2 ? '' : item.artistshow.map((e, int) => {
                                    if (int === item.artistshow.length - 1) {
                                        return e.artistname;
                                    } else {
                                        return e.artistname + " - ";
                                    }
                                })}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}
export default QuanTam