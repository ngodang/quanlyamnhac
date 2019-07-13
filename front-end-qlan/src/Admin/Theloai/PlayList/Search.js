import React, { Component } from 'react';
import '../Home.css';

import url from '../../../url'

import axios from 'axios'

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strSearch: '',
            listbathat: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleGetbaihat = this.handleGetbaihat.bind(this);
    }

    handleSearch() {
        this.props.onClickTim(this.state.strSearch);
    }

    handleChange(event) {
        this.setState({ strSearch: event.target.value });
    }

    handleClear() {
        this.setState({ strSearch: '' });
        this.props.onClickTim('');
    }

    handleGetbaihat() {
        const self = this;
        axios({
            method: 'GET',
            url: url + 'baihat/lists'
        }).then(function (response) {
            self.props.onSetListbaihat(response.data.data)
            self.props.onCheckDele(1)
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <div className="input-group">
                        <input value={this.state.strSearch} onChange={this.handleChange} type="text" className="form-control showicon" placeholder="Tìm kiếm ..." required />
                        <i className="fa fa-times-circle" onClick={this.handleClear}></i>
                        <span className="input-group-btn">
                            <button onClick={this.handleSearch} className="btn btn-info" type="button">Tìm</button>
                        </span>
                    </div>
                </div>
                <div className="col-sm-5">
                    <button onClick={this.handleGetbaihat} className="btn btn-primary">Thêm bài hát</button>
                </div>
            </div>
        );
    }
}

export default Search;


