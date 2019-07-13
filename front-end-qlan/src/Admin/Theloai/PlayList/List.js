import React, { Component } from 'react';
import '../Home.css';
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
                <Item playlistID={this.props.playlistID}
                    isDelete={this.props.isDelete}
                    key={index} item={item} index={index} />
            );
        });
        return (
            <div className="panel panel-success" style={{ "margin": "0", "marginTop": "10px" }}>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bài hát</th>
                            <th>Trình Bày</th>
                            <th></th>
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


