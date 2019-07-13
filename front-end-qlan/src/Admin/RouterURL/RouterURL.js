import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import DSBaihat from '../Baihat/Home';
import ThemBaihat from '../Baihat/Insert';
import DSNgheSi from '../Nghesi/Home';
import ThemNgheSi from '../Nghesi/Insert';
import DSTheLoai from '../Theloai/Home';
class RouterURL extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={DSBaihat} />
                <Route path="/thembaihat" component={ThemBaihat} />
                <Route path="/dsnghesi" component={DSNgheSi} />
                <Route path="/themnghesi" component={ThemNgheSi} />
                <Route path="/dstheloai" component={DSTheLoai} />
            </div>
        );
    }
}

export default RouterURL;


