import React, { Component } from 'react'

class About extends Component{
  constructor(props){
    super(props);
    this.state = {username : props.username}
  }
  render(){
    return(
      <div>
        <h2>About</h2>
        <h3>Welcome <u>{this.state.username}</u></h3>
      </div>
    );
  }
}

export default About;
