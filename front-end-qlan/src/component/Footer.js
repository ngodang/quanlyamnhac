import React, { Component } from 'react'
class Footer extends Component {
  render() {
    return (
      <div className="row" style={{ margin: 0 }}>
        <footer className="well" style={{ margin: 0 }}>
          <div className="row">
            <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">Hỗ trợ</h5>
              <a href="#!">Thỏa thuận sử dụng</a>
            </div>
            <div className="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">Sản phẩm khác</h5>
              <ul className="list-unstyled">
                <li>
                  <p>
                    <a href="#!">Chính sách bảo mật</a>
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">Địa chỉ</h5>
              <ul className="list-unstyled">
                <li>
                  <p>
                    <i className="fa fa-home mr-3" /> Cần Thơ</p>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-lg-2 text-center mx-auto my-4">
              <h5 className="font-weight-bold text-uppercase mb-4">Follow Us</h5>
              <a type="button">
                <i className="fa fa-facebook-official" />
              </a>
              <a type="button" className="btn-floating btn-tw">
                <i className="fa fa-twitter" />
              </a>
              <a type="button" className="btn-floating btn-gplus">
                <i className="fa fa-google-plus-square" />
              </a>
              <a type="button" className="btn-floating btn-dribbble">
                <i className="fa fa-instagram fa-lg white-text mr-4" />
              </a>
            </div>
          </div>
          <div className="footer-copyright text-center py-3">© 2019 Copyright:
          <a href="https://mdbootstrap.com/education/bootstrap/"> Music.com</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer;