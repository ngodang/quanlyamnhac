import React, {Component} from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

class SidebarAdmin extends Component {
    render() {
        return (
            <div className="sidebar">
                <Link to="/admin/baihat">Quản Lý Bài Hát</Link>
                <Link to="/admin/dsnghesi">Quản Lý Nghệ Sĩ</Link>
                <Link to="/admin/dstheloai">Quản Lý Thể loại</Link>
            </div>
        );
    }
}

export default SidebarAdmin;