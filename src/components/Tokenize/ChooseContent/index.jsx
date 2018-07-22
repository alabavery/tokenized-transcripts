import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/client';
import './styles.css';

export default class ChooseContent extends React.Component {
  static propTypes = { onDownloadContent: PropTypes.func.isRequired };

  state = { previews: [] };
  componentDidMount() {
    console.log("componentDidMount");
    const self = this;
    api.audio.getPreviews().then(res => {
        console.log("Here we are", res);
        self.setState({ previews: res.data.previews })
      },
    );
  }

  handleDownload = async contentId => {
    await api.content.getById(contentId).then(phrasesNameAndPathRes => {
      const { name, phrases, path_to_audio } = phrasesNameAndPathRes.data;
      console.log(phrasesNameAndPathRes.data);
      api.content.getAudiobyPath(path_to_audio).then(audioFileRes => {
        this.props.handleDownload(name, phrases, audioFileRes.data); // why does IDE say promise is returned?... should be resolved at this point
      });
    });
    console.log("after promises");
  };

  render() {
    console.log("\n\nthis.state.choices", this.state.previews);
    const previewElements = this.state.previews.map(preview => (
        <div key={preview.id} id={preview.id} className="choice" onClick={e => this.handleDownload(e.currentTarget.id)}>
          <span className="preview-name">{preview.name}</span><span className="preview-snippet">{preview.snippet}</span>
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
