
import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';

class SignupForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSignedIn: false,
      isLoading: false,
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpUsername: '',
      signUpPassword: '',
    };
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignUp = this.onSignUp.bind(this);

  }

  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangeSignUpUsername(event){
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp(){
    const{
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpUsername,
      signUpPassword,
    } = this.state;

    const postData = {
      email: signUpEmail,
      first_name: signUpFirstName,
      last_name: signUpLastName,
      password: signUpPassword,
      username: signUpUsername,
    };

    this.setState({
      isLoading: true,
    });
    axios.post('http://localhost:9000/accounts/signup/', postData)
      .then(response => {
        let data = response.data;
        console.log(data);
        if(data.ack === '1'){
          console.log(data.msg);
          this.setState({
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpUsername: '',
            signUpPassword: '',
            signUpError: data.msg,
            isLoading: false,
          });
        }
      else{
        this.setState({
          signUpError: data.msg,
          isLoading: false,
        });
      }

      })
      .catch(error => {
        console.log(error);
        this.setState({
          signUpError: 'Error connecting to server',
          isLoading: false,
        })
      });
  }

  render(){
    const {
      isSignedIn,
      isLoading,
      signUpEmail,
      signUpError,
      signUpUsername,
      signUpLastName,
      signUpFirstName,
      signUpPassword,
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
        <div className='signup'>
          <div >
            {
              (signUpError)?(
                <p className='signup-error'>{signUpError}</p>
              ): (null)
            }
            <h3>Sign Up</h3>
            <label className='form-group'htmlFor='first_name'>
              First Name:
              <input
                type='text'
                placeholder=''
                value={signUpFirstName}
                className='form-control'
                onChange={this.onTextboxChangeSignUpFirstName}
              />
            </label>
            <br />
            <label className='form-group'htmlFor='last_name'>
              Last Name:
              <input
                type='text'
                placeholder=''
                value={signUpLastName}
                className='form-control'
                onChange={this.onTextboxChangeSignUpLastName}
              />
            </label>
            <br />
            <label className='form-group'htmlFor='email'>
              Email:
              <input
                type='email'
                placeholder=''
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
                className='form-control'
              />
            </label>
            <br />
            <label className='form-group'htmlFor='Username'>
              Username:
              <input
                type='text'
                placeholder=''
                value={signUpUsername}
                className='form-control'
                onChange={this.onTextboxChangeSignUpUsername}
              />
            </label>
            <br />
            <label className='form-group'htmlFor='password'>
              Password:
              <input
                type='password'
                placeholder=''
                value={signUpPassword}
                className='form-control'
                onChange={this.onTextboxChangeSignUpPassword}
              />
            </label>
            <br />
            <button
              className='btn btn-primary'
              onClick={this.onSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      );
    }
  }

}

export default SignupForm;
