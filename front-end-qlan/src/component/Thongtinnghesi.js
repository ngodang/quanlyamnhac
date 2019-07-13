import React, { Component } from 'react'
import '../css/style.css'
import ListBaihat from './Listbaihat';
import url from '../url'
import moment from 'moment';

class ThongTinNS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listbaihat: [],
            isShow: true,
            ttnghesi: []
        }
        this.thongtinClick = this.thongtinClick.bind(this);
        this.baihatClick = this.baihatClick.bind(this);
    }

    componentWillMount() {
        let thongtin = this.props.location.state;
        this.setState({
            ttnghesi: thongtin
        });
        fetch(url + 'baihat/findartist?artistId='+ thongtin.artistId)
        .then(response => response.json())
        .then(data => {
            this.setState({ listbaihat: data.data })});
    }

    thongtinClick(){
        this.setState({
            isShow: true
        })
    }

    baihatClick(){
        this.setState({
            isShow: false
        })
    }

    render() {
        let data = this.state.ttnghesi;
        let element = '';
        if (this.state.isShow) {
            element = (
                <div>
                    <h3 style={{ "fontWeight": 'bold' }}> {data.artistname} </h3>
                    <p> Tên thật: {data.artistname} </p>
                    <p> Quốc gia: {data.address}</p>
                    <p> Ngày sinh: {moment(data.birthday).format("YYYY-MM-DD")} </p>
                    <div >{data.story}</div>
                </div >
            )
        }else{
            console.log(this.state.listbaihat)
            element = <ListBaihat items = {this.state.listbaihat} isLoad = {2} />
        }

        return (
            <div className="container">
                <div>
                    <img alt="" src={data.image} style={{ height: '250px', width: '100%' }} />
                </div>
                <div className="media m-0">
                    <div className="d-flex mr-3">
                        <img className="img-fluid rounded-circle" src={data.image} alt="User" />
                    </div>
                    <div className="media-body">
                        <p className="m-0">{data.artistname}</p>
                    </div>
                </div>
                <div className="form-group" style={{'marginTop': "15px"}}>
                    <button onClick={this.thongtinClick} className="btn btn-default" style={{'marginRight': "15px"}}>Thông Tin</button>
                    <button onClick={this.baihatClick} className="btn btn-default">Bài Hát</button>
                </div>
                {element}
            </div>
        )
    }

}

export default ThongTinNS