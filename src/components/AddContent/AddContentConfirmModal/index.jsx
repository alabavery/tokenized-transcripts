import React from 'react';
import PropTypes from 'prop-types';

const AddContentConfirmModal = props => {
  if (props.open) {
    return (
      <div className="confirm-modal">
        <h3>Upload audio and transcript phrases below?</h3>
        Audio file name: {props.audioFileName} <br />
        Transcript that begins: {props.transcriptSnippet}
        <button onClick={props.onConfirm}>Confirm</button>
      </div>
    );
  }
  return null;
};

AddContentConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  audioFileName: PropTypes.string.isRequired,
  transcriptSnippet: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddContentConfirmModal;