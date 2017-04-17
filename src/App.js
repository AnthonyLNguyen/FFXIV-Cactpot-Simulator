import React, { Component } from 'react';
import './App.css';
import Calc from './Calc';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <img src={require('./cactuar.png')} className="App-logo" alt="logo"/>
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
