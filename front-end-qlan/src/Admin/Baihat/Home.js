import React, {Component} from 'react'
import SidebarAdmin from '../Sidebar/Sidebar'
import './Home.css'
import {filter, includes, remove } from 'lodash'
import url from '../../url'

import axios from 'axios'

import Title from './Title'
import Control from './Control'
import List from './List'

class DSBaihat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
            strSearch: '',
            slTheLoai: '',
            checkSearch: 0
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount(){
        const self = this;
        axios({
            method: 'GET',
            url: url + 'baihat/lists'
        }).then(function (response) {
            self.setState({
                items: response.data.data
            });
          }).catch(function (error) {
            console.log(error);
          });
    }

    handleSearch(value) {
        this.setState ({
            strSearch: value,
            checkSearch: 0
        });
    }

    handleSelect(value) {
        this.setState ({
            slTheLoai: value,
            checkSearch: 1
        });
    }

    handleDelete(id) {
        let items = this.state.items;
        remove(items,(item) => {
            return item.id === id;
        });
        this.setState({
            items : items
        });
    }
    
    render() {
        let itemsOrigin = this.state.items;
        let items       = [];
        const search    = this.state.strSearch;

        items = filter(itemsOrigin, (item) => {
            return includes(item.songname.toLocaleLowerCase(), search.toLocaleLowerCase());
        });
 
        return (
            <div>
                <SidebarAdmin/>
            <div className="main">
                <Title />
                <Control 
                    onClickSearchTim={this.handleSearch}
                    onClickSelect={this.handleSelect}
                />
                <List 
                    items={items}
                    onClickDelete={this.handleDelete}
                />
            </div>
            </div>
        );
    }
}

export default DSBaihat;


