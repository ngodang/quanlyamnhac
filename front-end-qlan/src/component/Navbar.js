import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

class Navbar_login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAdmin: false,
			isCheck: false
		}

		this._handleDangxuat = this._handleDangxuat.bind(this);
	}

	componentWillMount() {
		if (localStorage.getItem('quanlyamnhac')) {
			const athur = JSON.parse(localStorage.getItem('quanlyamnhac'));
			if (athur.role === "ROLE_ADMIN") {
				this.setState({
					isAdmin: true,
					isCheck: true
				})
			} else if (athur.role === "ROLE_USER") {
				this.setState({
					isAdmin: false,
					isCheck: true
				})
			}
		}
	}

	_handleDangxuat() {
		localStorage.removeItem('quanlyamnhac');
		window.location.replace("/");
	}

	render() {

		let elmQl = null;
		let elmDX = null;
		let elmDN = null;
		let elmDK = null;

		if (this.state.isAdmin && this.state.isCheck) {
			elmQl = (<li className="nav-item">
				<Link to="/admin" className="nav-link">
					Quản Lý
			                    </Link>
			</li>)
			elmDX = (<li className="nav-item">
				<a onClick={this._handleDangxuat} className="nav-link">
					Đăng Xuất
			                    </a>
			</li>)
		} else if (!this.state.isAdmin && this.state.isCheck) {
			elmDX = (<li className="nav-item">
				<a onClick={this._handleDangxuat} className="nav-link">
					Đăng Xuất
					</a>
			</li>)
		} else {
			elmDN = (<li className="nav-item">
				<Link to="/dangnhap" className="nav-link">
					Đăng nhập
			                    </Link>
			</li>)
			elmDK = (<li className="nav-item">
				<Link to="/dangky" className="nav-link">
					Đăng ký
			                    </Link>
			</li>)
		}

		return (
			<nav className="navbar navbar-default" role="navigation">
				<div className="container-fluid">
					<div className="navbar-header">
						<div>
							<Link to="/" className="nav-link">
								<img alt="" src="https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/52/3a/06/523a06fc-027a-897d-7bce-9a5749b67505/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-10.png/246x0w.jpg" style={{ width: '100px', height: '50px' }} />
							</Link>
						</div>
					</div>
					<div className="collapse navbar-collapse navbar-ex1-collapse">
						<ul className="nav navbar-nav">
							{/* <li className="nav-item">
								<Link to="/" className="nav-link">
									Home
			                  </Link>
							</li> */}
							<li className="nav-item">
								<Link to="/baihat" className="nav-link">
									Bài hát
			                    </Link>
							</li>
							<li className="nav-item">
								<Link to="/theloai" className="nav-link">
									Thể loại
			                    </Link>
							</li>
							<li className="nav-item">
								<Link to="/nghesi" className="nav-link">
									Nghệ sĩ
			                    </Link>
							</li>

						</ul>
						<form className="navbar-form navbar-left" role="search">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Tìm kiếm bài hát, ca sĩ"></input>
							</div>
							<button type="submit" className="btn btn-primary">Tìm</button>
						</form>
						<ul className="nav navbar-nav navbar-right">
							{elmQl}
							{elmDX}
							{elmDN}
							{elmDK}
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
export default Navbar_login;