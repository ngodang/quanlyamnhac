import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

class ListBaihat extends Component {

    render() {
            let items = this.props.items;
            let itemtamp = items;
            let isLoai = this.props.isLoad;
            console.log(items)
            return (
                <div className="container">
                    <div className="row">
                        {items.map((item, index) => (
                            <div className="col-sm-4 baihat" key={item.songId}>
                                <div className="col-sm-3 imagebaihat">
                                    <img src={item.songimage}
                                        alt="" className="img-rounded img-responsive" style={{height: '55px', width: '55px'}}/>
                                </div>
                                <div className="col-sm-9 namebaihat">
                                    <Link to={{ pathname: '/playlist', state: { playlists: isLoai == 0 ? [item] : [...[item], ...items.slice(0,index), ...items.slice(index + 1,items.length)], playlistname: "", isCheck: true, path: isLoai == 0 ? 'baihat/findrandom?songId='+item.songId : 'nghesi/lists', isLoai: isLoai} }} className="nav-link">
                                        {item.songname}
                                    </Link><br></br>
                                    {
                                        item.artistshow.map((e, int) => {
                                            if (int === item.artistshow.length - 1) {
                                                return e.artistname;
                                            } else {
                                                return e.artistname + " - ";
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
    }
}
export default ListBaihat;