import React from 'react';
import PropTypes from 'prop-types';

export default class ChooseContent extends React.Component {
  static propTypes = { onChoice: PropTypes.func.isRequired };
  state = { choices: [] };

  render() {
    return <div>Audio Downloader</div>;
  }
}
