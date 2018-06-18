import React from 'react';
import PropType from 'prop-types';
import './styles.css';

const PhraseDisplay = props => {
  return (
    <div className="phrase-display">
      {props.phrase}
    </div>
  );
};

export default PhraseDisplay;
