import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
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
        const item = this.props.item;
        const index = this.props.index;
        const i = item.artistshow.length;
        let trinhbay = '';
        return (
            <tr>
                <td>{index + 1}</td>
                <td><img alt="" src={item.songimage} className="avatar" /></td>
                <td>{item.songname}</td>
                <td>
                    {
                        item.artistshow.map((e, int) => {
                            trinhbay = e.artistname + ", ";
                            if (int === i - 1) {
                                trinhbay = e.artistname;
                            }
                            return trinhbay;
                        })
                    }
                </td>
                <td>{item.artists.artistname}</td>
                {/* <td>{item.songimage}</td> */}
                <td className="tdtieusu">
                    <div>{item.lyrics}</div>
                </td>
                {/* <td className="filepath">{item.filepathsong}</td> */}
                <td>{item.listen}</td>
                <td className="thaotac">
                    <Link to={"/admin/suabaihat?idbaihat=" + item.songId}><button type="button" className="btn btn-warning">Sửa</button></Link>
                    <button onClick={() => this.handleDelete(item.id)} type="button" className="btn btn-danger">Xóa</button>
                </td>
            </tr>
        );
    }
}

export default Item;


