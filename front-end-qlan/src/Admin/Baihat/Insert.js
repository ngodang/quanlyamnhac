import React, { Component } from 'react'
import SidebarAdmin from '../Sidebar/Sidebar'
import './Home.css'
import axios from 'axios'
import url from '../../url'

class ThemBaihat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            BaiHat: '',
            TrinhBay: '',
            SangTac: '',
            LoiBaiHat: '',
            FileUp: null,
            Poster: null
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
        const baihat = {
            "songname": this.state.BaiHat,
            "lyrics": this.state.LoiBaiHat
        }

        const trinhbay = this.state.TrinhBay.split(',');

        formData.append("file", this.state.FileUp);
        formData.append("fileimage", this.state.Poster);
        formData.append("baihat", JSON.stringify(baihat));
        formData.append("sangtac", this.state.SangTac);
        formData.append("trinhbay", trinhbay);
        axios({
            method: 'post',
            url: url + 'baihat/create',
            data: formData
        })
            .then(function (response) {
                console.log(response.data)
                if (response.data.status === "FAILED") {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                    self.setState({
                        BaiHat: '',
                        TrinhBay: '',
                        SangTac: '',
                        LoiBaiHat: '',
                        FileUp: null,
                        Poster: null
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
                        <h2 className="TieuDe">Thêm mới bài hát</h2>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="row row-baihat">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="">Tên bài hát</label>
                                    <input value={this.state.BaiHat} onChange={this.handleChange} type="text" className="form-control" name="BaiHat" placeholder="Nhập tên bài hát" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Trình bày (Ví dụ: ca sĩ 1 - ca sĩ 2 - ca sĩ 3 - ...)</label>
                                    <input value={this.state.TrinhBay} onChange={this.handleChange} type="text" className="form-control" name="TrinhBay" placeholder="Nhập tên ca sĩ" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Sáng tác</label>
                                    <input value={this.state.SangTac} onChange={this.handleChange} type="text" className="form-control" name="SangTac" placeholder="Nhập tên nhạc sĩ" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">File Upload</label>
                                    <input onChange={this.handleChange} type="file" className="form-control" name="FileUp" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Poster</label>
                                    <input onChange={this.handleChange} type="file" className="form-control" name="Poster" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="">Lời bài hát</label>
                                    <textarea value={this.state.LoiBaiHat} onChange={this.handleChange} name="LoiBaiHat" className="form-control" rows="16" required="required"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row row-baihat btn-submit">
                            <button type="submit" className="btn btn-success">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ThemBaihat;


