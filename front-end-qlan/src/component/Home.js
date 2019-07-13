import React, { Component } from 'react'
import ListBaihat from './Listbaihat'
import Playlist from './Playlist';
import axios from 'axios'
import url from '../url'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
      listsbaihat: []
    }
  }

  componentWillMount() {
    const self = this;
    axios({
      method: 'GET',
      url: url + 'playlist/findall'
    }).then(function (response) {
      self.setState({
        playlists: response.data.data
      });
    }).catch(function (error) {
      console.log(error);
    });

    axios({
      method: 'GET',
      url: url + 'baihat/lists'
    }).then(function (response) {
      console.log(response.data.data)
      self.setState({
        listsbaihat: response.data.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {

    let items = this.state.playlists;
    let listbaihat = this.state.listsbaihat;
    console.log(listbaihat)
    return (
      <div className="container">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to={0} className="active" />
            <li data-target="#myCarousel" data-slide-to={1} />
            <li data-target="#myCarousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="item active">
              <img alt="" src="img/hinhnhac.jpg" style={{ width: '100%', height: '500px' }} />
            </div>
            <div className="item">
              <img alt="" src="https://photo-zmp3.zadn.vn/banner/e/7/8/e/e78e9b655298fcab25b3a2c7840d9ede.jpg" style={{ width: '100%', height: '500px' }} />
            </div>
            <div className="item">
              <img alt="" src="https://avatar-nct.nixcdn.com/slideshow/2019/06/19/d/3/2/d/1560906608884_org.jpg" style={{ width: '100%', height: '500px' }} />
            </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div>
          <h3 style={{ color: 'blue' }}> BÀI HÁT > </h3>
          <ListBaihat items = {listbaihat} isLoad = {0}/>
        </div>
        <br />
        <div>
          <h3 style={{ color: 'blue' }}> Playlist Mới > </h3>
          <Playlist items={items} />
        </div>
      </div>
    )
  }
}

export default Home;