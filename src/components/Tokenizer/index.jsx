import React from 'react';
import PhraseDisplay from '../PhraseDisplay';
import AudioUpload from '../AudioUpload';
import './styles.css';

export default class Tokenizer extends React.Component {
    // static propTypes = {
    //   audio: // file or stream or something
    //   text: // the entire thing
    // };
    static tokenizeText(text) {
      const tokenized = [];
      text.split('.').forEach(
        sub => {
          sub.split(',').forEach(
            subSub => {
              tokenized.push(subSub);
            })
        }
      );
      return tokenized;
    }

    state = {
      phrases: ['No phrases added'],
      currentPhraseIndex: 0,
      audio: null,
      audioPlayback: 1,
      tokens: [],
    };

    constructor(props) {
      super(props);
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
      this.setState({ phrases: Tokenizer.tokenizeText(this.props.text) });
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

    static writeJson = tokens => {
      document.getElementById('json-area').innerHTML = (JSON.stringify(tokens));
    };

    render() {
      return (
        <div>
          <div id="audio-wrapper">
            <AudioUpload onAudioUpload={audio => this.audio = audio} />
            <button onClick={this.slowDownAudio}>Slow Playback Rate</button>
            <button onClick={this.speedUpAudio}>Increase Playback Rate</button>
          </div>
          <PhraseDisplay
            phrase={this.state.phrases[this.state.currentPhraseIndex]}
          />
          <button onClick={() => Tokenizer.writeJson(this.state.tokens)}>Generate Json</button>
          <div id="json-area">No Json generated yet</div>
        </div>
      );
    }
}
