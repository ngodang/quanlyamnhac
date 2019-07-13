import React, {Component} from 'react';
import Search from './Search';
import {Link} from 'react-router-dom';
import Sort from './Sort';
class Control extends Component {
    render() {
        return (
            <div className="row row-baihat">  
                <Search onClickTim={this.props.onClickSearchTim}/>
                <Sort onClickChon={this.props.onClickSelect}/>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <Link to="/admin/thembaihat" className="themmoi"><button type="button" className="btn btn-info btn-block">Thêm mới</button></Link>
                </div>
            </div>   
        );
    }
}

export default Control;


