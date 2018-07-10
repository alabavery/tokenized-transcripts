import React from 'react';
import PropTypes from 'prop-types';
import DisplayTokenizedTranscript from '../DisplayTokenizedTranscript';
import './styles.css';

// where you paste transcripts into
class AddTranscript extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', preliminaryTokens: [], addIsOpen: true, confirmIsOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.generateTokens = this.generateTokens.bind(this);
  }

  generateTokens(event) {
    const preliminaryTokens = this.state.value.split('.');
    this.setState({ preliminaryTokens, addIsOpen: false, confirmIsOpen: true });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFinalizeTokens() {
    this.props.after
  }

  render() {
    if (this.props.open) {
      return this.state.addIsOpen ? (
        <form onSubmit={this.generateTokens}>
          <label>
            Copy and paste transcript here:
            <input className="transcript-input" type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Generate Tokens"/>
        </form>
      ) : (
        <DisplayTokenizedTranscript
          open={this.state.displayTokensOpen}
          onConfirm={() => this.setState({ displayTokensOpen: false, addTranscriptOpen: true })}
          tokens={this.state.transcriptTokens}
        />
      );
    }
    return null;
  }
}

export default AddTranscript;