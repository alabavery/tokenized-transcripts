import React from 'react';
import PropTypes from 'prop-types';

const AddContentConfirmModal = props => {
  if (props.open) {
    return (
      <div className="confirm-modal">
        <h3>Upload audio and transcript phrases below?</h3>
        Audio file name: {props.audioFileName} <br />
        Transcript that begins: {props.transcriptSnippet}
        <div className="button-container">
          <button className="back-button">Back</button>
          <button className="forward-button" onClick={props.onConfirm}>Confirm</button>
        </div>
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
