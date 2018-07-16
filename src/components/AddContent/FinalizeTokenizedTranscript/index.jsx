import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const FinalizeTokenizedTranscript = props => {
  const finalizedTokens = props.tokens; // eventually have ability to change this here
  if (props.open) {
    const tokenElements = finalizedTokens.map(token =>
      <div key={uuid()} className="token-text">{token}</div>
    );
    return (
      <div>
        <div className="tokens-container">{tokenElements}</div>
        <button onClick={() => props.onConfirm(finalizedTokens)}>Confirm</button>
      </div>
    );
  }
  return null;
};

FinalizeTokenizedTranscript.propTypes = {
  tokens: PropTypes.array.isRequired, // array of strings
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default FinalizeTokenizedTranscript;