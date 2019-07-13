import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import url from '../url'
import axios from 'axios'

class Nghesi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listNghesi: []
        }
    }

    componentWillMount() {
        const self = this;

        axios({
            method: 'GET',
            url: url + 'nghesi/lists'
        }).then(function (response) {
            self.setState({
                listNghesi: response.data.data
            });

          }).catch(function (error) {
            console.log(error);
          });
    }

    render() {
        let list = this.state.listNghesi;
        console.log(list)
        return (
            <div className="container">
                <div className="row">
                    {list.map(item => (
                        <div className="col-md-3" key={item.artistId}>
                            <Link to={{ pathname: '/nghesi/thongtinnghesi', state: item }}>
                                <img alt="" src={item.image} style={{ width: '100%', height: '200px' }} />
                                <h4>{item.artistname}</h4>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default Nghesi