import React, { Component } from 'react';
import Search from './Search';
class Control extends Component {
    render() {
        return (
            <div className="row">
                <Search onSetListbaihat={this.props.onSetListbaihat}
                    onClickTim={this.props.onClickSearchTim}
                    onCheckDele={this.props.onCheckDele} />
            </div>
        );
    }
}

export default Control;


