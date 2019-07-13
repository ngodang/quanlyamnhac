import React, { Component } from 'react';
import '../css/style.css';
import Playlist from './Playlist';
import axios from 'axios'
import url from '../url'

class Theloai extends Component {

    constructor(props) {
        super(props);

        this.state = {
            liststheloai: [],
            playlists:[],
            title: 'Tất cả playlist >'
        }

        this._handleClick = this._handleClick.bind(this)
    }

    componentWillMount(){
        let sefl = this;
        axios({
            method: 'GET',
            url: url + 'theloai/lists'
        }).then(function (response) {
            sefl.setState({
                liststheloai: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });

        axios({
          method: 'GET',
          url: url + 'playlist/findall'
        }).then(function (response) {
            sefl.setState({
            playlists: response.data.data
          });
        }).catch(function (error) {
          console.log(error);
        });
    }

    _handleClick(categoryId, categoryname){
        let sefl = this;
        console.log(categoryId)
        axios({
            method: 'GET',
            url: url + 'playlist/findtheloai?categoryId='+categoryId
          }).then(function (response) {
            sefl.setState({
              playlists: response.data.data,
              title: categoryname+ " >"
            });
          }).catch(function (error) {
            console.log(error);
          });
    }

    render() {
        if(this.state.liststheloai.length === 0)
            return (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        let items = this.state.playlists;
        const titlplaylist = this.state.title
        return (
            <div className="container">
                <h3 style={{ color: 'blue' }}> Chủ Đề & Thể Loại > </h3>
                <div className="row theloai">
                    {this.state.liststheloai.map(e =>(
                        <span onClick={this._handleClick.bind(null,e.categoryId, e.categoryname)} className="titletheloai" key={e.categoryId}>{e.categoryname}</span>
                    ))}
                </div>
                <h3 style={{ color: 'blue' }}>{titlplaylist}</h3>
                <Playlist items={items}></Playlist>
            </div>
        )
    }
}
export default Theloai