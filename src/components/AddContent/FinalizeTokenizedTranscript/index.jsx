import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const FinalizeTokenizedTranscript = props => {
  const preliminaryTokens = props.tokens.map(token => ({ text: token, id: uuid() }));

  const finalizedTokens = preliminaryTokens; // eventually have ability to change this here
  if (props.open) {
    const tokenElements = preliminaryTokens.map(token =>
      <div key={token.id} className="token-text">{token.text}</div>
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
  tokens: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default FinalizeTokenizedTranscript;