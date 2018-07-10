import React from 'react';
import AudioUpload from '../../components/AudioUpload';
import AddTranscript from '../../components/AddTranscript';
import DisplayTokenizedTranscript from '../../components/DisplayTokenizedTranscript';
import AddContentConfirmModal from '../../components/AddContentConfirmModal';
import './styles.css';

export default class AddContent extends React.Component {
  state = {
    transcriptTokens: [],
    audio: null,
    addTranscriptOpen: true,
    displayTokensOpen: false,
    confirmModalOpen: false,
    audioFileName: null
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
    return (
      <div className="add-content-container">
        <AudioUpload afterUpload={audio => this.handleAudioUpload(audio)}/>
        <AddTranscript
          open={this.state.addTranscriptOpen}
          afterGenerateTokens={tokens => this.handleTranscriptTokenGeneration(tokens)}
        />
        <DisplayTokenizedTranscript
          open={this.state.displayTokensOpen}
          onConfirm={() => this.setState({ displayTokensOpen: false, addTranscriptOpen: true })}
          tokens={this.state.transcriptTokens}
        />
        <AddContentConfirmModal
          open={this.state.confirmModalOpen}
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