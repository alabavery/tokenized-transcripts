import React from 'react';
import AudioUpload from '../../components/AddContent/AudioUpload';
import AddTranscript from '../../components/AddContent/AddTranscript';
import AddContentConfirmModal from '../../components/AddContent/AddContentConfirmModal';
import api from '../../services/client';
import './styles.css';

export default class AddContentPage extends React.Component {
  state = {
    audio: null,
    audioFileName: 'no audio file passed',
    transcriptSnippet: 'no transcript snippet',
    transcriptTokens: [], // Array.string
    displaying: 'audio', // displayed 'sub-component'... options are 'audio', 'transcript', and 'confirm'
  };

  handleAudioUpload = (audio, audioFileName) => {
    this.setState({ audio, audioFileName, displaying: 'transcript' });
  };

  handleTranscriptTokenGeneration = transcriptTokens => {
    console.log("AddContentPage is handling transcript token gen... first token is");
    console.log(transcriptTokens[0]);
    this.setState({ transcriptTokens, transcriptSnippet: transcriptTokens[0], displaying: 'confirm' });
  };

  handleSave = () => {
    // here, in one request, send the audio and the broken up transcript to server
    // something like... send(this.state.audio, this.state.audioFileName, this.state.transcriptTokens)
    const formData = new FormData();
    formData.append('track', this.state.audio);
    formData.append('name', this.state.audioFileName);
    const stringifiedTokens = JSON.stringify(this.state.transcriptTokens);
    formData.append('transcriptTokens', stringifiedTokens);
    api.content.post(formData);
    this.setState({ displaying: 'audio' }); // go back to the beginning
  };

  render() {
    const { displaying } = this.state;

    return (
      <div className="add-content-container">
        <div className="copy-container">
            <p>How's about you upload some audio, my dude?</p>
          <AudioUpload
            open={displaying==='audio'}
            onConfirm={(audio, audioFileName) => this.handleAudioUpload(audio, audioFileName)}
          />
          <AddTranscript
            open={displaying==='transcript'}
            onConfirm={tokens => this.handleTranscriptTokenGeneration(tokens)}
          />
          <AddContentConfirmModal
            open={displaying==='confirm'}
            audioFileName={this.state.audioFileName}
            transcriptSnippet={this.state.transcriptSnippet}
            onConfirm={this.handleSave}
          />
        </div>
      </div>
    )
  }
}
