import React, { Component } from 'react'
import axios from 'axios'
import url from '../url'

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    axios({
      method: 'post',
      url: url + 'login',
      data: formData
    })
      .then(function (response) {
        if(response.data.status === "FAILED"){
          alert(response.data.message)
        }else{
          const data = {
            username: response.data.data.username,
            fullname: response.data.data.fullname,
            role: response.data.data.role,
          }
          localStorage.removeItem('quanlyamnhac');
          localStorage.setItem('quanlyamnhac', JSON.stringify(data));
          window.location.replace("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: "\n\t\n/* sign in FORM */\n#logreg-forms{\n    width:412px;\n    margin:10vh auto;\n    background-color:#f3f3f3;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n  transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n}\n#logreg-forms form {\n    width: 100%;\n    max-width: 410px;\n    padding: 15px;\n    margin: auto;\n}\n#logreg-forms .form-control {\n    position: relative;\n    box-sizing: border-box;\n    height: auto;\n    padding: 10px;\n    font-size: 16px;\n}\n#logreg-forms .form-control:focus { z-index: 2; }\n#logreg-forms .form-signin input[type=\"email\"] {\n    margin-bottom: -1px;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n#logreg-forms .form-signin input[type=\"password\"] {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n\n#logreg-forms .social-login{\n    width:390px;\n    margin:0 auto;\n    margin-bottom: 14px;\n}\n#logreg-forms .social-btn{\n    font-weight: 100;\n    color:white;\n    width:190px;\n    font-size: 0.9rem;\n}\n\n#logreg-forms a{\n    display: block;\n    padding-top:10px;\n    color:lightseagreen;\n}\n\n#logreg-form .lines{\n    width:200px;\n    border:1px solid red;\n}\n\n\n#logreg-forms button[type=\"submit\"]{ margin-top:10px; }\n\n#logreg-forms .facebook-btn{  background-color:#3C589C; }\n\n#logreg-forms .google-btn{ background-color: #DF4B3B; }\n\n#logreg-forms .form-reset, #logreg-forms .form-signup{ display: none; }\n\n#logreg-forms .form-signup .social-btn{ width:210px; }\n\n#logreg-forms .form-signup input { margin-bottom: 2px;}\n\n.form-signup .social-login{\n    width:210px !important;\n    margin: 0 auto;\n}\n\n/* Mobile */\n\n@media screen and (max-width:500px){\n    #logreg-forms{\n        width:300px;\n    }\n    \n    #logreg-forms  .social-login{\n        width:200px;\n        margin:0 auto;\n        margin-bottom: 10px;\n    }\n    #logreg-forms  .social-btn{\n        font-size: 1.3rem;\n        font-weight: 100;\n        color:white;\n        width:200px;\n        height: 56px;\n        \n    }\n    #logreg-forms .social-btn:nth-child(1){\n        margin-bottom: 5px;\n    }\n    #logreg-forms .social-btn span{\n        display: none;\n    }\n    #logreg-forms  .facebook-btn:after{\n        content:'Facebook';\n    }\n  \n    #logreg-forms  .google-btn:after{\n        content:'Google+';\n    }\n    \n}\n" }} />
        <div id="logreg-forms">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}> Sign in</h1>
            <div className="social-login">
              <button className="btn facebook-btn social-btn" type="button" style={{ height: '35px', "fontSize": '13px' }}><div><i className="fab fa-facebook-f" /> Sign in with Facebook</div> </button>
              <button className="btn google-btn social-btn" type="button" style={{ height: '35px', "fontSize": '13px' }}><div><i className="fab fa-google-plus-g" /> Sign in with Google+</div> </button>
            </div>
            <p style={{ textAlign: 'center' }}> OR</p>
            <input type="username" value={this.state.username} onChange={this.handleChange} name="username" className="form-control" placeholder="Email address" required autoFocus />
            <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" placeholder="Password" required />
            <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt" /> Sign in</button>
            {/* <a id="forgot_pswd">Forgot password?</a> */}
            <hr />
            <button className="btn btn-primary btn-block" type="submit" id="btn-signup"><i className="fas fa-user-plus" /> Sign up New Account</button>
          </form>
          <br />
        </div>
      </div>
    );
  }
}

export default Signin