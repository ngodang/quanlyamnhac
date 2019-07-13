import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        this.props.onClickDelete(id);
    }

    render() {
        const { item } = this.props;
        const { index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td><img alt="" src={item.image} className="avatar" /></td>
                <td>{item.artistname}</td>
                <td>{item.realname}</td>
                <td>{item.artistsex}</td>
                <td>
                    {moment(item.birthday).format("YYYY-MM-DD")}
                </td>
                <td>{item.address}</td>
                <td className="tdtieusu">
                    <div>{item.story}</div>
                </td>
                <td className="thaotac">
                <Link to={"/admin/suanghesi?idnghesi=" + item.artistId}><button type="button" className="btn btn-warning">Sửa</button></Link>
                    <button onClick={() => this.handleDelete(item.id)} type="button" className="btn btn-danger">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default Item;


