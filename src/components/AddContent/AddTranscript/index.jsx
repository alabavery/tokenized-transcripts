import React from 'react';
import PropTypes from 'prop-types';
import FinalizeTokenizedTranscript from '../FinalizeTokenizedTranscript/index';
import './styles.css';

// where you paste transcripts into
class AddTranscript extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { value: '', preliminaryTokens: [], addIsOpen: true, finalizeIsOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.generateTokens = this.generateTokens.bind(this);
  }

  generateTokens(event) {
    const preliminaryTokens = this.state.value.split('.');
    console.log(`\nset AddTranscript.state.preliminaryTokens... first token is ${preliminaryTokens[0]}`);
    this.setState({ preliminaryTokens, addIsOpen: false, finalizeIsOpen: true });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFinalizeTokens(finalizedTokens) {
    this.props.onConfirm(finalizedTokens);
  }

  render() {
    return this.props.open ? (
      <div className="transcript">
        <form onSubmit={this.generateTokens}>
          <label>
            Copy and paste transcript here:
            <input className="transcript-input" type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Generate Tokens"/>
        </form>
        <FinalizeTokenizedTranscript
          open={this.state.finalizeIsOpen}
          onConfirm={finalizedTokens => this.handleFinalizeTokens(finalizedTokens)}
          tokens={this.state.preliminaryTokens}
        />
      </div>
    ) : null;
  }
}

export default AddTranscript;