import React, {Component} from 'react';
import Search from './Search';
import { Link} from 'react-router-dom';
class Control extends Component {
    render() {
        return (
            <div className="row row-nghesi">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <Link to="/admin/themnghesi" className="themmoi"><button type="button" className="btn btn-info btn-block">Thêm mới</button></Link>
                </div> 
                <Search onClickTim={this.props.onClickSearchTim}/>  
            </div>   
        );
    }
}

export default Control;


