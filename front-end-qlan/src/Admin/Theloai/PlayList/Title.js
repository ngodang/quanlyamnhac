import React, {Component} from 'react';
import '../Home.css';
class Title extends Component {
    render() {
        return (
            <div className="page-header">
                <h2 className="TieuDe">{this.props.Nameplaylist}</h2>
            </div>
        );
    }
}

export default Title;


