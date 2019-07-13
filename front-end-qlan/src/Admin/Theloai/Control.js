import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import FromPlaylist from './Frominsert';
import axios from 'axios'
import url from '../../url'

class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listtheloai: []
        }

        this.handleGetThelooai = this.handleGetThelooai.bind(this);
    }

    componentWillMount() {
        this.handleGetThelooai();
    }

    handleGetThelooai() {
        let sefl = this;
        axios({
            method: 'GET',
            url: url + 'theloai/lists'
        }).then(function (response) {
            console.log(response.data.data)
            sefl.setState({
                listtheloai: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const item = this.state.listtheloai
        console.log(item)
        return (
            <div className="row">
                <Search onClickTim={this.props.onClickSearchTim} />
                <Sort
                    onGetListTheLoai={this.handleGetThelooai}
                    ListTheLoai={this.state.listtheloai} />
                <FromPlaylist
                    onGetListTheLoai={this.handleGetThelooai}
                    ListTheLoai={this.state.listtheloai} /> 
            </div>
        );
    }
}

export default Control;


