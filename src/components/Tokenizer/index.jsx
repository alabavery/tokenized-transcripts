import React from 'react';
import PhraseDisplay from '../PhraseDisplay';

export default class Tokenizer extends React.Component {
    // static propTypes = {
    //   audio: // file or stream or something
    //   text: // the entire thing
    // };
    constructor(props) {
      super(props);
      document.onkeydown = e => {
        const key = e.keyCode ? e.keyCode : e.which;
        if (key == 38) { // up
          this.onForwardPress();
        } else if (key == 40) { // down
          this.onBackwardPress();
        };
      };
    }
    state = { currentPhraseIndex: 0 };

    onForwardPress = () => {
      if (this.state.currentPhraseIndex < this.props.phrases.length - 1) {
        this.setState({
          currentPhraseIndex: this.state.currentPhraseIndex + 1,
        });
      }
    }

    onBackwardPress = () => {
      if (this.state.currentPhraseIndex > 0) {
        this.setState({
          currentPhraseIndex: this.state.currentPhraseIndex - 1,
        });
      }
    }

    render() {
      return (
        <PhraseDisplay
        phrase={this.props.phrases[this.state.currentPhraseIndex]}
        />
      );
    }
}
