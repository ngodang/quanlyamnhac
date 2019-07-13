import React, { Component } from 'react'
import axios from 'axios'
import url from '../url'


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      password: '',
      confirm: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    if(this.state.password !== this.state.confirm){
      alert("Confirmpassword không đúng")
    }else{
      axios.post(url + 'dangky', {
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname
      })
        .then(function (response) {
          if(response.data.status === "FAILED"){
            alert("username đã tồn tại")
          }else{
            window.location.replace("/dangnhap");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  render() {

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: "\n    \t/*\n/* Created by Filipe Pina\n * Specific styles of signin, register, component\n */\n/*\n * General styles\n */\n\nbody, html{\n     height: 100%;\n \tbackground-repeat: no-repeat;\n \tbFackground-color: #d3d3d3;\n \tfont-family: 'Oxygen', sans-serif;\n}\n\n.main{\n \tmargin-top: 70px;\n}\n\nh1.title { \n\tfont-size: 50px;\n\tfont-family: 'Passion One', cursive; \n\tfont-weight: 400px; \n}\n\nhr{\n\twidth: 10%;\n\tcolor: #fff;\n}\n\n.form-group{\n\tmargin-bottom: 15px;\n}\n\nlabel{\n \tfont-size: 15px;\n\tmargin-bottom: 15px;\n}\n\ninput,\ninput::-webkit-input-placeholder {\n    font-size: 13px;\n    padding-top: 3px;\n}\n\n.main-login{\n \tbackground-color: #fff;\n    /* shadows and rounded borders */\n    -moz-border-radius: 2px;\n    -webkit-border-radius: 2px;\n    border-radius: 2px;\n    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n\n}\n\n.main-center{\n \tbackground-color:#f3f3f3;\n \tmargin-top: 30px;\n \tmargin: 0 auto;\n \tmax-width: 450px;\n    padding: 40px 40px;\n\n}\n\n.login-button{\n \tfont-size:15px;\n\tmargin-top: 5px;\n}\n\n.login-register{\n\tfont-size: 13px;\n\ttext-align: center;\n}\n\n    " }} />
        <div className="container">
          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname" className="cols-sm-2 control-label">Full name</label>
                <div className="cols-sm-10">
                  <div className="input-group" >
                    <div className="input-group-addon" style={{ "color": 'blue' }}><i className="fa fa-user fa" aria-hidden="true" /></div>
                    <input type="text" value={this.state.fullname} onChange={this.handleChange} className="form-control" name='fullname' id='fullname' placeholder='Enter your Name' required autofocus/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username" className="cols-sm-2 control-label">Username</label>
                <div className="cols-sm-10">
                  <div className="input-group" >
                    <div className="input-group-addon" style={{ "color": 'blue' }}><i className="a fa-users fa" aria-hidden="true" /></div>
                    <input type="text" value={this.state.username} onChange={this.handleChange} className="form-control" name='username' id='username' placeholder='Enter your username' required/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                <div className="cols-sm-10">
                  <div className="input-group" >
                    <div className="input-group-addon" style={{ "color": 'blue' }}><i className="fa fa-lock fa-lg" aria-hidden="true" /></div>
                    <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" name='password' id='password' placeholder='Enter your password' required/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm password</label>
                <div className="cols-sm-10">
                  <div className="input-group" >
                    <div className="input-group-addon" style={{ "color": 'blue' }}><i className="fa fa-lock fa-lg" aria-hidden="true" /></div>
                    <input type="password" value={this.state.confirm} onChange={this.handleChange} className="form-control" name='confirm' id='confirm' placeholder='Enter your confirm' required/>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
              </div>
              <div className="login-register">
                <a href="index.php">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )

  }
}

export default Register;