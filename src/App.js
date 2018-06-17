import React, { Component } from 'react';
import logo from './raspberrypilogo.png';
import './App.css';
import Dropzone from 'react-dropzone';

class App extends Component {
  constructor(props) {
    super(props);
    this.dropzone = React.createRef();
  }
  
  onUpload = files => {
    console.log(files);
    const audioElement = document.createElement("AUDIO");
    // document.body.insertBefore(audioElement, document.getElementById('after-audio'));
    const audioWrapper = document.getElementById('audio-wrapper');
    audioWrapper.insertBefore(audioElement, document.getElementById('after-audio'));
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button
          type="primary"
          onClick={() => {this.dropzone.current.open();}}>
          Click
        </button>
        <Dropzone accept=".mp3,.wav" ref={this.dropzone} style={{}} onDrop={this.onUpload} />

        <div id="audio-wrapper">
          <div id="after-audio"></div>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
