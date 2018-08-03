import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Phrase = props => {
  return <div className={props.selected ? "selected-phrase" : "unselected-phrase"}>{props.phrase.text}</div>;
};

Phrase.propTypes = {
  phrase: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Phrase;