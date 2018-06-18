import React, { Component } from 'react';
import logo from './raspberrypilogo.png';
import './App.css';
import Tokenizer from './components/Tokenizer';
import AudioUpload from './components/AudioUpload';

const phrases = [
  'phrase 0',
  'phrase 1',
  'phrase 2',
  'phrase 3',
  'phrase 4',
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AudioUpload />
        <Tokenizer phrases={phrases} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
