import React, { Component } from 'react'
import './Home.css'
import SidebarAdmin from '../Sidebar/Sidebar'
import axios from 'axios'
import url from '../../url'

class ThemNgheSi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Avatar: null,
            txtNgheDanh: '',
            txtTenThat: '',
            rdGioiTinh: 'Nam',
            DateNgaySinh: '',
            txtQueQuan: '',
            txtTieuSu: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const self = this;
        const formData = new FormData();
        const nghesi = {
            "artistname": this.state.txtNgheDanh,
            "realname": this.state.txtTenThat,
            "artistsex": this.state.rdGioiTinh,
            "birthday": this.state.DateNgaySinh,
            "address": this.state.txtQueQuan,
            "story": this.state.txtTieuSu,
        }
        formData.append("file", this.state.Avatar);
        formData.append("nghesi", JSON.stringify(nghesi));
        axios({
            method: 'post',
            url: url + 'nghesi/create',
            data: formData
        })
            .then(function (response) {
                if (response.data.status === "FAILED") {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                    self.setState({
                        Avatar: null,
                        txtNgheDanh: '',
                        txtTenThat: '',
                        rdGioiTinh: 'Nam',
                        DateNgaySinh: '',
                        txtQueQuan: '',
                        txtTieuSu: ''
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div className="main">
                    <div className="title">
                        <h2 className="TieuDe">Thêm mới nghệ sĩ</h2>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="row row-nghesi">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="">Ảnh đại diện</label>
                                    <input onChange={this.handleChange} type="file" className="form-control" name="Avatar" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Nghệ danh</label>
                                    <input value={this.state.txtNgheDanh} onChange={this.handleChange} type="text" className="form-control" name="txtNgheDanh" placeholder="Nhập nghệ danh" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Tên thật</label>
                                    <input value={this.state.txtTenThat} onChange={this.handleChange} type="text" className="form-control" name="txtTenThat" placeholder="Nhập tên nghệ sĩ" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Giới tính</label>
                                    <div className="radio">
                                        <label><input onChange={this.handleChange} checked={this.state.rdGioiTinh === "Nam"} type="radio" name="rdGioiTinh" value="Nam" /> Nam </label><br />
                                        <label><input onChange={this.handleChange} checked={this.state.rdGioiTinh === "Nữ"} type="radio" name="rdGioiTinh" value="Nữ" /> Nữ</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Ngày sinh</label>
                                    <input value={this.state.DateNgaySinh} onChange={this.handleChange} type="date" className="form-control" name="DateNgaySinh" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Quê quán</label>
                                    <input value={this.state.txtQueQuan} onChange={this.handleChange} type="text" className="form-control" name="txtQueQuan" placeholder="Nhập quê quán" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="">Tiểu sử</label>
                                    <textarea value={this.state.txtTieuSu} onChange={this.handleChange} name="txtTieuSu" className="form-control" rows="20" required="required"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row row-nghesi btn-submit">
                            <button type="submit" className="btn btn-success">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ThemNgheSi;