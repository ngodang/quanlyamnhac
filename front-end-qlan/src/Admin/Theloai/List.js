import React, { Component } from 'react';
import './Home.css';
import Item from './Item';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const items = this.props.items;
        const elmItem = items.map((item, index) => {
            return (
                <Item setPlaylistname={this.props.setPlaylistname}
                    onGetListBH={this.props.onSetListbaihat}
                    key={index} item={item} index={index}
                    onSetPlaylistID={this.props.onSetPlaylistID}
                    onCheckDele = {this.props.onCheckDele}
                />
            );
        });

        return (
            <div className="panel panel-success" style={{ 'margin': '0' }}>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Poster</th>
                            <th>Playlist</th>
                            <th>Thể Loại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elmItem}
                    </tbody>
                </table>

            </div>

        );
    }
}

export default List;


