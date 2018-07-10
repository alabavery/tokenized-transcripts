import React from 'react';
import AudioUpload from '../../components/AudioUpload';
import AddTranscript from '../../components/AddTranscript';
import AddContentConfirmModal from '../../components/AddContentConfirmModal';
import './styles.css';

export default class AddContent extends React.Component {
  state = {
    transcriptTokens: [],
    audio: null,
    audioFileName: null,

    displaying: ['audio', 'transcript', 'confirm'],
  };

  handleSave = () => {
    // here, in one request, send the audio and the broken up transcript to server
  };

  handleAudioUpload = audio => {
    this.setState({ audio });
  };

  handleTranscriptTokenGeneration = tokens => {
    this.setState({ transcriptTokens: tokens, addTranscriptOpen: false, displayTokensOpen: true });
  };

  handleConfirmModalOpen = () => {
    console.log("tokens", this.state.transcriptTokens);
    this.setState({ confirmModalOpen: true });
  };

  render() {
    const { displaying } = this.state;
    return (
      <div className="add-content-container">
        <AudioUpload open={displaying==='addAudio'} afterUpload={audio => this.handleAudioUpload(audio)}/>
        <AddTranscript
          open={displaying==='addTranscript'}
          afterGenerateTokens={tokens => this.handleTranscriptTokenGeneration(tokens)}
        />
        <AddContentConfirmModal
          open={displaying==='confirm'}
          audioFileName={this.state.audioFileName}
          onConfirm={this.handleSave}
        />
        <button
          id="open-save-button"
          onClick={() => this.handleConfirmModalOpen()}
          disabled={false}>
          Review and Save
        </button>
      </div>
    )
  }
}