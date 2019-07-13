import React, { Component } from 'react';
import SidebarAdmin from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DSBaihat from '../Baihat/Home';

class HomeAdmin extends Component {
    render() {
        return (
            <Router>
                <div>
                    <SidebarAdmin />
                    <Route exact path="/admin" component={DSBaihat} />
                </div>
            </Router>

        );
    }
}

export default HomeAdmin;


