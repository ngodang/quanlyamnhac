import React, { Component } from 'react';
import axios from 'axios'
import url from '../../../url'

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleThembaihat = this.handleThembaihat.bind(this)
    }

    handleThembaihat(){
        const playlistId = this.props.playlistID;
        const songID = this.props.item.songId;
        const fromData = new FormData();
        console.log(playlistId)
        console.log(songID)
        fromData.append("playlistID", playlistId);
        fromData.append("baihatID", songID);


        axios({
            method: 'POST',
            url: url + 'playlist/thembaihatvaoplaylist',
            data: fromData
        })
        .then(function(response){
            alert(response.data.message)
        })
        .catch(function(error){
            console.log(error)
        })

    }

    render() {
        
        console.log(this.props.playlistID)
        const item = this.props.item;
        const index = this.props.index;
        const isCheck = this.props.isDelete
        const i = item.artistshow.length;
        let trinhbay = ''

        let element = (
            <button type="button" className="btn btn-danger">Xóa</button>
        )

        if (isCheck === 1) {
            element = (
                <button onClick={this.handleThembaihat} type="button" className="btn btn-success">Thêm</button>
            )
        }

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.songname}</td>
                <td>
                    {
                        item.artistshow.map((e, int) => {
                            trinhbay = e.artistname + ", ";
                            if (int === i - 1) {
                                trinhbay = e.artistname;
                            }
                            return trinhbay;
                        })
                    }
                </td>
                <td style={{ 'maxWidth': '60px' }}>
                    {element}
                </td>
            </tr>
        );
    }
}

export default Item;


