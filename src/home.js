import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './home/login.js';
import SignupForm from './home/signup.js';
import './home/home.css';

class Logout extends Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
  }
  logout(){
    axios.get('http://localhost:8000/accounts/logout/')
      .then(response => {
        var data = response.data;
        if(data.ack === '1')
        {
          this.props.changeSignedInStatusFunction(false);
        }
      })
      .catch(error =>{

      });
  }
  render(){
    return(
      <button className='btn btn-primary logout-button' onClick={this.logout}>Log Out</button>
    );
  }
}

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSignedIn : false,
      isLoading : false,
      token: '',
    }

    this.changeSignInStatus = this.changeSignInStatus.bind(this);
    this.setToken = this.setToken.bind(this);
    this.loadRoom = this.loadRoom.bind(this);
  }
  componentDidMount(){

  }
  loadRoom(event){
    const id = event.target.id;
    const {
      token,
    } = this.state;
    var headers = {
      'Authorization' : 'Token ' + token,
      'Content-Type': 'application/json',
    }
    axios.delete(`http://localhost:9000/accounts/deleteUser/${id}/`, {'headers': headers})
      .then(response => {
        axios.get('http://localhost:9000/accounts/userList/', {headers: headers})
          .then(response => {
            var AllUserData = response.data;
            var userListNew = AllUserData.map((userData, index) =>
            <div  onClick={this.loadRoom} key={index}>
              <li className='list-group-item user-button' id={userData.id}>
                <span >
                  {userData.username}
                </span>
              </li>
            </div>
            );
            this.setState({
              userList: userListNew,
            });
          });
      });
  }
  changeSignInStatus(value){
    this.setState({
      isSignedIn: false,
      token: '',
    });
  }
  setToken(token){
    this.setState({
      token: token,
      isSignedIn: true,
    })
  }
  render(){
    const {
      isSignedIn,
      isLoading,
      token,
      userList
    } = this.state;

    if(isLoading){
      return(
        <div className="loading spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if(!isSignedIn){
      return(
        <div className='home'>
        <h2>Home</h2>
        <SignupForm />
        <LoginForm setTokenFunction={this.setToken}/>
        </div>
      );
    }
    var headers = {
      'Authorization' : 'Token ' + token,
      'Content-Type': 'application/json',
    }
    if(!userList){
      axios.get('http://localhost:9000/accounts/userList/', {headers: headers})
      .then(response => {
        var AllUserData = response.data
        var userListNew = AllUserData.map((userData, index) =>
        <div  onClick={this.loadRoom} key={index}>
          <li className='list-group-item user-button' id={userData.id}>
            <span >
              {userData.username}
            </span>
          </li>
        </div>
        );
        this.setState({
          userList: userListNew,
        });
    });
    }

    return(
      <div className='col-3'>
        {
          {userList}?(
            <ul className='list-group'>{userList}</ul>
          ):(null)
        }
        <Logout changeSignedInStatusFunction={this.changeSignInStatus} />
      </div>
    );
  }
}


export default Home;
