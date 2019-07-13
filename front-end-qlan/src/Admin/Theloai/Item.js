import React, { Component } from 'react';
class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listbaihat: [],
            playlistId: 0,
            playlistName: ''
        };

        this.handleGetbaihat = this.handleGetbaihat.bind(this);
    }

    componentWillMount(){
        const item = this.props.item;
        this.setState({
            listbaihat: item.song,
            playlistId: item.playlistId,
            playlistName: item.playlistname
        })
    }

    handleGetbaihat() {
        this.props.onGetListBH(this.state.listbaihat);
        this.props.setPlaylistname(this.state.playlistName)
        this.props.onSetPlaylistID(this.state.playlistId)
        this.props.onCheckDele(0)
    }

    render() {
        const item = this.props.item;
        const index = this.props.index;

        return (
            <tr>
                <td>{index + 1}</td>
                <td><img alt="" src={item.playlistimage} className="avatar" /></td>
                <td>{item.playlistname}</td>
                <td>{item.category.categoryname}</td>
                <td style={{ 'maxWidth': '50px' }}>
                    <button onClick={this.handleGetbaihat} style={{ 'marginBottom': '5px' }} type="button" className="btn btn-danger btnxem">Xem</button>
                    <button style={{ 'marginBottom': '5px' }} type="button" className="btn btn-danger btnxem">Sửa</button>
                    <button style={{ 'marginLeft': '10px' }} type="button" className="btn btn-danger">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default Item;


