import React, {Component} from 'react';
import './Home.css';
class Sort extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theloaiId: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // this.props.onClickChon(event.target.value);
        this.setState({theloaiId: event.target.value});
    }
    
    render() {
        
        const listtheloai = this.props.ListTheLoai;
        console.log(listtheloai)
        return (
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <select value={this.state.theloaiId} onChange={this.handleChange} name="theloaiId" className="form-control">
                    <option value={0} >--- Thể loại ---</option>
                    {listtheloai.map((e, index)=>{
                        return <option key={index} value={e.categoryId}>{e.categoryname}</option>
                    })}
                </select>
                
                
            </div>   
        );
    }
}

export default Sort;


