import React, { Component } from 'react'
import './Home.css'
import { filter, includes, remove } from 'lodash'
import SidebarAdmin from '../Sidebar/Sidebar'
import axios from 'axios'
import url from '../../url'

import Title from './Title'
import Control from './Control'
import List from './List'
// import sings from '../mock/sings'
class DSNgheSi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: '',
            strSearch: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentWillMount(){

        const self = this;

        axios({
            method: 'GET',
            url: url + 'nghesi/lists'
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

    handleDelete(id) {
        let items = this.state.items;
        remove(items, (item) => {
            return item.id === id;
        });
        this.setState({
            items: items
        });
    }

    render() {
        let itemsOrigin = this.state.items;
        let items = [];
        const search = this.state.strSearch;

        items = filter(itemsOrigin, (item) => {
            return includes(item.artistname.toLocaleLowerCase(), search.toLocaleLowerCase());
        });

        return (
            <div>
                <SidebarAdmin />
                <div className="main">
                    <Title />
                    <Control
                        onClickSearchTim={this.handleSearch}
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

export default DSNgheSi;


