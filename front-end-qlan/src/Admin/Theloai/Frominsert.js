import React, { Component } from 'react'
import axios from 'axios'
import url from '../../url'

class FromPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theloaiId: 0,
            isFromPlaylist: false,
            isFromTheLoai: false,
            playlistname: '',
            theloainame: '',
            theloaiimage: null
        }

        this.onClickNewplaylist = this.onClickNewplaylist.bind(this);
        this.onClickNewTheloai = this.onClickNewTheloai.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitTheloai = this.handleSubmitTheloai.bind(this);
        this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this);
        this.onCloseFrom = this.onCloseFrom.bind(this);
    }

    handleChange(event) {

        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmitTheloai(event) {
        event.preventDefault();
        let sefl = this;
        axios({
            method: "POST",
            url: url + 'theloai/createandedit',
            data: {
                'categoryname': sefl.state.theloainame
            }
        }).then(function (response) {
            if (response.data.status === "FAILED") {
                alert(response.data.message);
            } else {
                alert(response.data.message);
                sefl.setState({
                    theloainame: ''
                })
                sefl.props.onGetListTheLoai();
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmitPlaylist(event) {
        event.preventDefault();
        let sefl = this;

        const formData = new FormData();
        const Playlist = {
            "playlistname": this.state.playlistname,
        }

        formData.append("file", this.state.theloaiimage);
        formData.append("Playlist", JSON.stringify(Playlist));
        formData.append("theloaiId", this.state.theloaiId);

        axios({
            method: "POST",
            url: url + 'playlist/themplaylist',
            data: formData
        }).then(function (response) {
            if (response.data.status === "FAILED") {
                alert(response.data.message);
            } else {
                alert(response.data.message);
                sefl.setState({
                    playlistname: '',
                    theloaiimage: null
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onClickNewplaylist() {
        this.setState({
            isFromPlaylist: true,
            isFromTheLoai: false
        })
    }
    onClickNewTheloai() {
        this.setState({
            isFromPlaylist: false,
            isFromTheLoai: true
        })
    }

    onCloseFrom(){
        this.setState({
            isFromPlaylist: false,
            isFromTheLoai: false
        })
    }

    render() {
        let FromTheLoai = '';
        let FromPlayList = '';
        if (this.state.isFromTheLoai) {
            FromTheLoai = (
                <form onSubmit={this.handleSubmitTheloai}>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input value={this.state.theloainame} name="theloainame" onChange={this.handleChange} type="text" className="form-control" placeholder="New thể loại ..." required />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-success">Thêm</button>
                        <button onClick={this.onCloseFrom} type="button" className="btn btn-success">Close</button>
                    </div>
                </form>
            )
        }

        if (this.state.isFromPlaylist) {
            FromPlayList = (
                <form onSubmit={this.handleSubmitPlaylist}>
                    <div className="col-sm-12">
                        <select value={this.state.theloaiId} onChange={this.handleChange} name="theloaiId" className="form-control" required>
                            <option value={0} >--- Thể loại ---</option>
                            {this.props.ListTheLoai.map((e, index) => {
                                return <option key={index} value={e.categoryId}>{e.categoryname}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm-12" style={{ "paddingTop": "10px" }}>
                        <div className="form-group">
                            <input value={this.state.playlistname} name="playlistname" onChange={this.handleChange} type="text" className="form-control" placeholder="New playlist ..." required />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="">File Upload</label>
                            <input onChange={this.handleChange} type="file" className="form-control" name="theloaiimage" required />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-success">Thêm</button>
                        <button onClick={this.onCloseFrom} type="button" className="btn btn-success">Close</button>
                    </div>
                </form>
            )
        }

        return (
            <div className="group-newplaylist">
                <div className="row row-baihat">
                    <div className="col-sm-12">
                        <button onClick={this.onClickNewTheloai} className="btn btn-primary">New Thể Loại</button>
                        <button onClick={this.onClickNewplaylist} className="btn btn-primary">New Playlist</button>
                    </div>
                </div>
                <div className="row row-baihat">
                    {FromTheLoai}
                    {FromPlayList}
                </div>
            </div>
        )
    }
}

export default FromPlaylist