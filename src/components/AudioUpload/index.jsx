import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import api from '../../services/client';

/**
 * This is a standalone button and will go in Settings page and on Tokenizer page.  It will just upload audio to the
 * backend.
 */
export default class AudioUpload extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.dropzone = React.createRef();
  }

  static defaultProps = {
    onUpload: () => undefined,
  };

  onUpload = files => {
    console.log(files);
    const formData = new FormData();
    formData.append('track', files[0]);
    api.saveAudio.post(formData);
    this.props.onUpload(files[0]);
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
      </div>
    );
  }
}
