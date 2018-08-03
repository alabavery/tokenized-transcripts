import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/client';
import './styles.css';

/**
 * Render all the choices. Choose and download an audio file and phrases.
 */
export default class ChooseContent extends React.Component {
  static propTypes = { onDownloadContent: PropTypes.func.isRequired };

  state = { audioRecords: [] };

  componentDidMount() {
    console.log("ChooseContent.componentDidMount");
    const self = this;
    api.audio.getPreviews().then(res => {
        console.log("ChooseContent.componentDidMount in api.audio.getPreviews res", res);
        self.setState({ audioRecords: res.data.previews })
      },
    );
  }

  /**
   *
   * @param audioId - the uuid of an audio record
   * @returns {Promise<void>}
   */
  handleDownload = async audioId => {
    console.log(`calling ChooseContent.handleDownload(${audioId})`);
    const audioRecord = this.state.audioRecords.find(preview => preview.id === audioId);
    
    console.log(`audioRecord`, audioRecord);
    if (!audioRecord) {
      throw new Error(`No audio record in state for ${audioId}`);
    }

    const setFileRes = await api.audio.setFileSrc(audioRecord.path_to_audio);
    console.log("res", setFileRes);

    let phrases = await api.phrases.getByOriginalAudioId(audioId);
    phrases = phrases.data.phrases;
    this.props.onDownloadContent({ audioRecord, phrases });
  };

  render() {
    console.log("\n\nChooseContent.state.audioRecords", this.state.audioRecords);
    const previewElements = this.state.audioRecords.map(audioRecord => (
        <div
          key={audioRecord.id}
          id={audioRecord.id}
          className="preview"
          onClick={e => this.handleDownload(e.currentTarget.id)}>
          <span className="preview-name">{audioRecord.name}</span><span className="preview-snippet">{audioRecord.snippet}</span>
        </div>
      ),
    );
    return (
      <div className="choose-content">
        <h3>Choose the audio you want to work with</h3>
        <div className="previews">
          {previewElements}
        </div>
     </div>
    );
  }
}
