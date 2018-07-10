import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// where you paste transcripts into
class AddTranscript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.prepareTokenization = this.prepareTokenization.bind(this);
  }

  prepareTokenization(event) {
    const finalTokens = this.state.value.split('.');
    this.props.afterGenerateTokens(finalTokens);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log("rerendering and props.open are", this.props.open);
    return this.props.open ? (
      <div>
        <form onSubmit={this.prepareTokenization}>
          <label>
            Copy and paste transcript here:
            <input className="transcript-input" type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Generate Tokens"/>
        </form>
      </div>
    ) : null;
  }
}

export default AddTranscript;