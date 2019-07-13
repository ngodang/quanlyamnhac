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
        const elmItem = items.map((item, index)=> {
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
                            <th>Poster</th>
                            <th>Bài hát</th>
                            <th>Trình bày</th>
                            <th>Sáng tác</th>
                            <th>Lời bài hát</th>
                            {/* <th>File upload</th> */}
                            <th>Lượt nghe</th>
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


