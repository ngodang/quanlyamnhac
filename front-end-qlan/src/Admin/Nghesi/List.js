import React, {Component} from 'react';
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
                <Item onClickDelete={this.props.onClickDelete} key={index} item={item} index={index}/>
            );
        });

        return (
            <div className="panel panel-success">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ảnh đại diện</th>
                            <th>Nghệ danh</th>
                            <th>Tên thật</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Quê quán</th>
                            <th>Tiểu sử</th>
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


