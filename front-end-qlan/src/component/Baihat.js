import React, { Component } from 'react';
import '../css/style.css';
import ListBaihat from './Listbaihat'
import axios from 'axios'
import url from '../url'

class Baihat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsBaihat: []
        }
    }

    componentWillMount() {
        const self = this;
        axios({
            method: 'GET',
            url: url + 'baihat/lists'
        }).then(function (response) {
            self.setState({
                itemsBaihat: response.data.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.itemsBaihat.length > 0) {
            let items = this.state.itemsBaihat;

            return (
                <ListBaihat items = {items} isLoad = {0} />
            )
        } else {
            return (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        }
    }
}
export default Baihat;