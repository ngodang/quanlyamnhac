import React, {Component} from 'react';
import './Home.css';
class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strSearch: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        
    }

    handleSearch() {
        this.props.onClickTim(this.state.strSearch);
    }

    handleChange(event) {
        this.setState({strSearch: event.target.value});
    }

    handleClear() {
        this.setState({strSearch: ''});
        this.props.onClickTim('');
    }
    
    render() {
        return (
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div className="input-group">
                    <input value={this.state.strSearch} onChange={this.handleChange} type="text" className="form-control showicon" placeholder="Tìm kiếm ..." required/>
                    <i className="fa fa-times-circle" onClick={this.handleClear}></i>
                    <span className="input-group-btn">
                        <button onClick={this.handleSearch} className="btn btn-info" type="button">Tìm</button>
                    </span>
                </div>    
            </div>   
        );
    }
}

export default Search;


