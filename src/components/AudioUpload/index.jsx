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
    const audioElement = document.getElementById('audio');
    audioElement.src = fileUrl;
    this.props.onAudioUpload(audioElement);
  };

  render() {
    return (
      <div>
        <button
          type="primary"
          onClick={() => {this.dropzone.current.open();}}>
          Upload Audio
        </button>
        <Dropzone accept=".mp3,.wav" ref={this.dropzone} style={{}} onDrop={this.onUpload} />

        <audio controls id="audio">
          <source src="" type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
