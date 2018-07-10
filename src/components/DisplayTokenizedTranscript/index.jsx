import React from 'react';
import PropTypes from 'prop-types';

const DisplayTokenizedTranscript = props => {
  if (props.open) {
    const tokenElements = props.tokens.map(token => <div className="token-text">{token}</div>);
    return <div className="token-text-container">{tokenElements}</div>;
  }
  return null;
};

DisplayTokenizedTranscript.propTypes = { tokens: PropTypes.array.isRequired, open: PropTypes.bool.isRequired };

export default DisplayTokenizedTranscript;