import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calc from './Calc';
import Button from 'react-button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <img src={require('./tilesheet.png')} className="App-logo" alt="logo"/>
          <h2>Mini Cactpot Simulator</h2>
        </div>
        <p className="App-intro">
          Press Start to begin.<Calc/>
        </p>
      </div>
    );
  }
}

export default App;
