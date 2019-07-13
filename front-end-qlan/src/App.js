import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AutoPlayLists from './AutoPlayLists/example/AutoPlayLists';
import Home from './component/Home';
import Baihat from './component/Baihat';
import Theloai from './component/Theloai';
import Nghesi from './component/Nghesi';
import Navbar from './component/Navbar';
import './css/style.css';
import DSBaihat from './Admin/Baihat/Home';
import ThemBaihat from './Admin/Baihat/Insert';
import SuaBaihat from './Admin/Baihat/Edit';
import DSNgheSi from './Admin/Nghesi/Home';
import ThemNgheSi from './Admin/Nghesi/Insert';
import SuaNgheSi from './Admin/Nghesi/Edit';
import TheLoai from './Admin/Theloai/Home';
import ThongTinNS from './component/Thongtinnghesi';
// import Footer from './component/Footer';
import Login from './component/Signin';
import Register from './component/Register';

function App() {
  return (
    <Router>
      <div className="container-conten" style={{paddingBottom: '50px'}}>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/baihat" component={Baihat} />
        <Route exact path="/theloai" component={Theloai} />
        <Route exact path="/nghesi" component={Nghesi} />
        <Route exact path="/dangnhap" component={Login} />
        <Route exact path="/dangky" component={Register} />
        <Route exact path="/nghesi/thongtinnghesi" component={ThongTinNS} />
        <Route exact path="/playlist" component={AutoPlayLists} />
        {/* <Route exact path="/theloai/playlist" component={AutoPlayLists} /> */}

        <Route exact path="/admin" component={DSBaihat} />
        <Route exact path="/admin/baihat" component={DSBaihat} />
        <Route exact path="/admin/thembaihat" component={ThemBaihat} />
        <Route exact path="/admin/suabaihat" component={SuaBaihat} />
        <Route exact path="/admin/dsnghesi" component={DSNgheSi} />
        <Route exact path="/admin/themnghesi" component={ThemNgheSi} />
        <Route exact path="/admin/suanghesi" component={SuaNgheSi} />
        <Route exact path="/admin/dstheloai" component={TheLoai} />
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
