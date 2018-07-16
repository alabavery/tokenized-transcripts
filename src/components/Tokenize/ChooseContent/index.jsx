import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/client';
import './styles.css';

export default class ChooseContent extends React.Component {
  static propTypes = { onDownloadContent: PropTypes.func.isRequired };

  state = { choices: [] };
  componentDidMount() {
    console.log("componentDidMount");
    const self = this;
    api.content.getPreviews().then(res => {
        console.log("Here we are", res);
        self.setState({ choices: res.data.previews })
      },
    );
  }

  handleDownload = async contentId => {
    const downloaded = await api.content.getById(contentId);
    console.log(downloaded);
    // this.props.onDownloadContent(downloaded.audio, downloaded.tokens);
    console.log(`I just downloaded audio and tokens for ${contentId}`);
  };

  render() {
    console.log("\n\nthis.state.choices", this.state.choices);
    const choiceElements = this.state.choices.map(choice => (
        <div key={choice.id} id={choice.id} className="choice" onClick={e => this.handleDownload(e.currentTarget.id)}>
          <span className="choice-name">{choice.name}</span><span className="choice-snippet">{choice.snippet}</span>
        </div>
      ),
    );
    return (
      <div className="choose-content">
        <h3>Choose the audio you want to work with</h3>
        <div className="choices">
          {choiceElements}
        </div>
     </div>
    );
  }
}
