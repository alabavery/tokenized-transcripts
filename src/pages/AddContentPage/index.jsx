import React from 'react';
import AudioUpload from '../../components/AddContent/AudioUpload';
import AddTranscript from '../../components/AddContent/AddTranscript';
import AddContentConfirmModal from '../../components/AddContent/AddContentConfirmModal';
import './styles.css';

export default class AddContentPage extends React.Component {
  state = {
    audio: null,
    audioFileName: 'no audio file passed',
    transcriptSnippet: 'no transcript snippet',
    transcriptTokens: [], // Array.{ text, id }
    displaying: 'audio', // displayed 'sub-component'... options are 'audio', 'transcript', and 'confirm'
  };

  handleAudioUpload = (audio, audioFileName) => {
    this.setState({ audio, audioFileName, displaying: 'transcript' });
  };

  handleTranscriptTokenGeneration = transcriptTokens => {
    console.log("AddContentPage is handling transcript token gen... first token is");
    console.log(transcriptTokens[0]);
    this.setState({ transcriptTokens, transcriptSnippet: transcriptTokens[0].text, displaying: 'confirm' });
  };

  handleSave = () => {
    // const formData = new FormData();
    // formData.append('track', files[0]);
    // api.saveAudio.post(formData);
    // here, in one request, send the audio and the broken up transcript to server
    // something like... send(this.state.audio, this.state.audioFileName, this.state.transcriptTokens)
    this.setState({ displaying: 'audio' }); // go back to the beginning
  };

  render() {
    const { displaying } = this.state;
    console.log(`
      rendering AddContent...
      \nthis.state.audio is not null? -- ${this.state.audio !== null}
      \nthis.state.audioFileName is -- ${this.state.audioFileName}
      \nthis.state.transcriptTokens is empty? -- ${this.state.transcriptTokens.length === 0}
    `);
    return (
      <div className="add-content-container">
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
    )
  }
}