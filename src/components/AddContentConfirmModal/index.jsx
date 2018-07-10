import React from 'react';
import PropTypes from 'prop-types';

const AddContentConfirmModal = props => {
  if (props.open) {
    return (
      <div className="confirm-modal">
        {props.audioFileName} <br />
        {props.transcriptSnippet}
      </div>
    );
  }
  return null;
};

AddContentConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  audioFileName: PropTypes.string,
  transcriptSnippet: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
};

AddContentConfirmModal.defaultProps = {
  audioFileName: 'No Audio Passed',
  transcriptSnippet: 'No transcript snippet passed',
};

export default AddContentConfirmModal;