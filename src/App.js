import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './home.js';
import About from './About.js';
import Contact from './Contact.js';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {username : 'Sumit'}
    this.changeUsername = this.changeUsername.bind(this)
  }

  changeUsername(username){
    this.setState({username : username})
  }

  render(){
    return(
      <Router>
        <div>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className="navbar-brand" href="/">o_o</a>
          <ul className="navbar-nav mr-auto">
            <li><Link to={ '/' } className="nav-link">Home</Link></li>
            <li><Link to={ '/about' } className='nav-link'>About</Link></li>
            <li><Link to={ '/contact' } className='nav-link'>Contact</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' render={(history) => <Home changeFunction={this.changeUsername} />} />
            <Route path='/about' render={(history) => <About username={this.state.username} />}/>
            <Route path='/contact' component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
