import React, {Component} from 'react';
import './Home.css';
class Sort extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slTheLoai: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onClickChon(event.target.value);
        this.setState({slTheLoai: event.target.value});
    }
    
    render() {
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <select value={this.state.slTheLoai} onChange={this.handleChange} name="slTheLoai" className="form-control">
                    <option value="" >--- Thể loại ---</option>
                    <option value="Nhạc Trẻ">Nhạc Trẻ</option>
                    <option value="Nhạc trữ tình">Nhạc Trữ Tình</option>
                    <option value="Nhạc Thiếu Nhi">Nhạc Thiếu Nhi</option>
                    <option value="Nhạc Cách Mạng">Nhạc Cách Mạng</option>
                    <option value="Nhạc Hoa">Nhạc Hoa</option>
                    <option value="Nhạc Hàn Quốc">Nhạc Hàn Quốc</option>
                    <option value="Nhạc Thái Lan">Nhạc Thái Lan</option>
                    <option value="Nhạc HipHop">Nhạc HipHop</option>
                </select>
                
                
            </div>   
        );
    }
}

export default Sort;


