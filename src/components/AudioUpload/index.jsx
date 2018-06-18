import React from 'react';
import Dropzone from 'react-dropzone';

export default class AudioUpload extends React.Component {
  constructor(props) {
    super(props);
    this.dropzone = React.createRef();
  }

  onUpload = files => {
    console.log(files);
    const fileUrl = URL.createObjectURL(files[0]);
    const audioElement = document.createElement("AUDIO");
    audioElement.src = fileUrl;
    audioElement.controls = true;
    // document.body.insertBefore(audioElement, document.getElementById('after-audio'));
    const audioWrapper = document.getElementById('audio-wrapper');
    audioWrapper.insertBefore(audioElement, document.getElementById('after-audio'));
    audioElement.load();
  };

  render() {
    return (
      <div>
        <button
          type="primary"
          onClick={() => {this.dropzone.current.open();}}>
          Click
        </button>
        <Dropzone accept=".mp3,.wav" ref={this.dropzone} style={{}} onDrop={this.onUpload} />

        <div id="audio-wrapper">
          <div id="after-audio"></div>
        </div>
      </div>
    );
  }
}
