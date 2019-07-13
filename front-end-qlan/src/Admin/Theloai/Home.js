import React, { Component } from 'react';
import './Home.css';
import { filter, includes } from 'lodash';
import SidebarAdmin from '../Sidebar/Sidebar';


import Title from './Title';
import Control from './Control';
import List from './List';
import PlayList from './PlayList/Playlist';
import axios from 'axios'
import url from '../../url'

class DSTheLoai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            strSearch: '',
            listBaihat: [],
            isDelete: 0,
            playlistId: 0,
            playlistname: 'Chọn Playlist để xem bài hát',
            isShowfrom: false
        };


        this.handleSearch = this.handleSearch.bind(this);
        this.handleListbaihat = this.handleListbaihat.bind(this);
        this.handleIsDele = this.handleIsDele.bind(this);
        this.handlePlaylistname = this.handlePlaylistname.bind(this);
        this.hadleSetplaylistID = this.hadleSetplaylistID.bind(this);
    }

    componentWillMount() {
        const self = this;
        axios({
            method: 'GET',
            url: url + 'playlist/findall'
        }).then(function (response) {
            self.setState({
                items: response.data.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleSearch(value) {
        this.setState({
            strSearch: value
        });
    }

    handleListbaihat(value) {
        this.setState({
            listBaihat: value
        });
    }

    hadleSetplaylistID(value) {
        this.setState({
            playlistId: value
        });
    }

    handleIsDele(value) {
        this.setState({
            isDelete: value,
            isShowfrom: true,
        });
    }

    handlePlaylistname(value) {
        this.setState({
            playlistname: value
        })
    }

    render() {
        let itemsOrigin = this.state.items;
        let items = [];
        const search = this.state.strSearch;

        items = filter(itemsOrigin, (item) => {
            return includes(item.playlistname.toLocaleLowerCase(), search.toLocaleLowerCase());
        });

        let showfrom = '';
        if (this.state.isShowfrom) {
            showfrom = <PlayList playlistId={this.state.playlistId}
                onSetListbaihat={this.handleListbaihat}
                listbaihat={this.state.listBaihat}
                onCheckDele={this.handleIsDele}
                isDelete={this.state.isDelete}
                Nameplaylist={this.state.playlistname}
            />
        }

        return (
            <div>
                <SidebarAdmin />
                <div className="main">
                    <div className="row rowtheloai">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <Title />
                            <Control onClickSearchTim={this.handleSearch} />
                            <List
                                onSetListbaihat={this.handleListbaihat}
                                onSetPlaylistID={this.hadleSetplaylistID}
                                items={items}
                                setPlaylistname={this.handlePlaylistname}
                                onCheckDele={this.handleIsDele}
                            />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            {showfrom}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default DSTheLoai;


