import React from 'react';
import PhraseDisplay from '../../components/Tokenize/PhraseDisplay';
import ChooseContent from '../../components/Tokenize/ChooseContent';
import AudioPlayer from '../../components/Tokenize/AudioPlayer';
import './styles.css';
import api from '../../services/client';

export default class TokenizePage extends React.Component {
    state = {
      phrases: ['No phrases added'],
      currentPhraseIndex: 0,
      audio: null,
      audioPlayback: 1,
      tokens: [],
    };

    constructor(props) {
      super(props);
      this.audio = null;
      document.onkeydown = e => {
        const key = e.keyCode ? e.keyCode : e.which;
        if (key == 32) { // space
          this.playPauseAudio();
        } else if (key == 39) { // forward
          this.recordToken();
          this.nextPhrase();
        } else if (key == 37) { //backward
          this.previousPhrase();
        }
      };
    }
    
    recordToken() {
      if (this.audio) {
        console.log("recording token");
        this.setState({
          tokens: [
            ...this.state.tokens,
            this.getToken(this.audio.currentTime, this.state.phrases[this.state.currentPhraseIndex])
          ],
        });
      } else {
        console.log("didn't record token cause no audio");
      }
    }

    getToken(audioCurrentTime, phrase) {
      const startTime = this.state.tokens.length > 0 ? this.state.tokens[this.state.tokens.length - 1].endTime : 0;
      return { startTime, endTime: audioCurrentTime, phrase };
    }

    playPauseAudio() {
      if (this.audio !== null) {
        this.audio.paused ? this.audio.play() : this.audio.pause();
      }
    }

    componentDidMount() {

    }

    previousPhrase = () => {
      if (this.state.currentPhraseIndex > 0) {
        this.setState({
          currentPhraseIndex: this.state.currentPhraseIndex - 1,
        });
      }
    };

    nextPhrase = () => {
      if (this.state.currentPhraseIndex < this.state.phrases.length - 1) {
        this.setState({
          currentPhraseIndex: this.state.currentPhraseIndex + 1,
        });
      }
    };

    slowDownAudio = () => this.audio.playbackRate > 0.4 ? this.audio.playbackRate -= 0.4 : null;
    speedUpAudio = () => this.audio.playbackRate < 1.8 ? this.audio.playbackRate += 0.4 : null;

    render() {
      return (
        <div>
          <ChooseContent onChoice={(audio, tokens) => this.setState({ audio, tokens })} />
        </div>
      );
    }
}
