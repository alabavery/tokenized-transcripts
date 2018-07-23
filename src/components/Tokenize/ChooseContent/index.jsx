import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/client';
import './styles.css';

export default class ChooseContent extends React.Component {
  static propTypes = { onDownloadContent: PropTypes.func.isRequired };

  state = { audioRecords: [] };
  componentDidMount() {
    console.log("componentDidMount");
    const self = this;
    api.audio.getPreviews().then(res => {
        console.log("Here we are", res);
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
    const audioRecord = this.state.audioRecords.find(preview => preview.id === audioId);

    if (!audioRecord) {
      throw new Error(`No audio record in state for ${audioId}`);
    }

    const file = await api.audio.getFileByPath(audioRecord.path_to_audio);
    console.log(file);

    // // get the phrases
    // // get the audio file
    // api.audio.getFileByPath()
    //
    //
    // await api.content.getById(contentId).then(phrasesNameAndPathRes => {
    //   const { name, phrases, path_to_audio } = phrasesNameAndPathRes.data;
    //   console.log(phrasesNameAndPathRes.data);
    //   api.content.getAudiobyPath(path_to_audio).then(audioFileRes => {
    //     this.props.handleDownload(name, phrases, audioFileRes.data); // why does IDE say promise is returned?... should be resolved at this point
    //   });
    // });
    // console.log("after promises");
  };

  render() {
    console.log("\n\nthis.state.audioRecords", this.state.audioRecords);
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
