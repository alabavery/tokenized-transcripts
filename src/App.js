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
    const audioiElement = document.createElement("AUDIO");
  };
  
  render() {
    return (
      <div className="App">
        <button
          type="primary"
          onClick={() => {this.dropzone.current.open();}}>
          Click
        </button>

        <Dropzone accept=".mp3,.wav" ref={this.dropzone} style={{ display: 'none' }} onDrop={this.onUpload} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
