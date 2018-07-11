import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


export default class AudioUpload extends React.Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
  };

  state = { addIsOpen: true, finalizeIsOpen: false, audio: null };

  constructor(props) {
    super(props);
    this.dropzone = React.createRef();
  }

  onUpload = acceptedFiles => {
    const file = acceptedFiles[0];
    this.setState({ audio: file, addIsOpen: false, finalizeIsOpen: true });
  };

  handleNameAudio = name  => {
    // after name audio, go straight to next step
    name = this.state.audio.name;// TODO remove this and actually let user make name
    this.props.onConfirm(this.state.audio, name);
  };

  render() {
    if (this.props.open) {
      return this.state.addIsOpen ? (
        <div>
          <button
            type="primary"
            onClick={() => {this.dropzone.current.open();}}>
            Upload Audio
          </button>
          <Dropzone accept=".mp3,.wav" ref={this.dropzone} style={{}} onDrop={this.onUpload} />
        </div>
      ) : (
        <div>
          <div className="name-upload">
            Name your audio file: placeholder need to add input for this
            <button onClick={this.handleNameAudio}>Name and move to next step</button>
          </div>
        </div>
      );
    }
    return null;
  }
}
