import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSignedIn: false,
      isLoading: false,
      signInError: '',
      signInUsername: '',
      signInPassword: '',
    };
    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  }

  onTextboxChangeSignInUsername(event){
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn(){
    const{
      signInUsername,
      signInPassword,
    } = this.state;

    const postData = {
      password: signInPassword,
      username: signInUsername,
    };

    this.setState({
      isLoading: true,
    });
    axios.post('http://localhost:9000/accounts/login/', postData)
      .then(response => {
        let data = response.data;
        if(data.ack === '1'){
          this.props.setTokenFunction(data.token);
          this.setState({
            signInError: data.msg,
            isLoading: false,
          });
        }
      else{
        this.setState({
          signInError: data.msg,
          isLoading: false,
        });
      }

      })
      .catch(error => {
        console.log(error);
        this.setState({
          signInError: 'Error connecting to server',
          isLoading: false,
        })
      });
  }

  render(){
    const {
      isSignedIn,
      isLoading,
      signInError,
      signInUsername,
      signInPassword,
    } = this.state;

    if(isLoading){
      return (
        <div className="loading spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
        </div>
      )
    }
    if(!isSignedIn){
      return(
        <div className='signin'>
          <div >
            {
              (signInError)?(
                <p className='signin-error'>{signInError}</p>
              ): (null)
            }
            <h3>Sign In</h3>
            <label className='form-group'htmlFor='Username'>
              Username:
              <input
                type='text'
                placeholder=''
                value={signInUsername}
                className='form-control'
                onChange={this.onTextboxChangeSignInUsername}
              />
            </label>
            <br />
            <label className='form-group'htmlFor='password'>
              Password:
              <input
                type='password'
                placeholder=''
                value={signInPassword}
                className='form-control'
                onChange={this.onTextboxChangeSignInPassword}
              />
            </label>
            <br />
            <button
              className='btn btn-primary'
              onClick={this.onSignIn}>
              Sign Up
            </button>
          </div>
        </div>
      );
    }
  }
}
export default LoginForm;
