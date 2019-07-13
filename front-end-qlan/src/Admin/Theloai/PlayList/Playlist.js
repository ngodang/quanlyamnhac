import React, { Component } from 'react';
import '../Home.css';
import { filter, includes } from 'lodash';

import Title from './Title';
import Control from './Control';
import List from './List';
class PlayList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strSearch: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            strSearch: value
        });
    }

    render() {
        let itemsOrigin = this.props.listbaihat;
        let items = [];
        const search = this.state.strSearch;

        items = filter(itemsOrigin, (item) => {
            return includes(item.songname, search);
        });
        
        return (
            <div>
                <Title
                    Nameplaylist={this.props.Nameplaylist}
                />

                <Control onSetListbaihat={this.props.onSetListbaihat}
                    onClickSearchTim={this.handleSearch}
                    onCheckDele={this.props.onCheckDele} />

                <List playlistID={this.props.playlistId}
                    items={items}
                    isDelete={this.props.isDelete}
                />

            </div>


        );
    }
}

export default PlayList;