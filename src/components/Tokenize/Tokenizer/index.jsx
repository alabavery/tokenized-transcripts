import React from 'react';
import PropTypes from 'prop-types';
import Phrase from './Phrase';
import api from '../../../services/client';

export default class Tokenizer extends React.Component {
  static propTypes = {
    audioId: PropTypes.string.isRequired,
    audioName: PropTypes.string.isRequired,
    phrases: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      ordinalInOriginal: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  };

  state = {
    currentPhraseOrdinal: 0,
    recordedTokens: [], // { startTime, endTime, phraseOrdinalInOriginal }
  };

  constructor(props) {
    super(props);
    this.audioRef = React.createRef();

    document.onkeydown = e => {
      const key = e.keyCode ? e.keyCode : e.which;

      if (key == 32) { // space
        console.log(this.audioRef);
        this.playPauseAudio();
        e.preventDefault();

      } else if (key == 39) { // forward
        if (this.state.currentPhraseOrdinal < this.props.phrases.length) {
          this.recordToken();
          this.nextPhrase();
        }
        e.preventDefault();
      }
    }
  }

  playPauseAudio() {
    this.audioRef.current.paused ? this.audioRef.current.play() : this.audioRef.current.pause();
  }

  recordToken = () => {
    const { recordedTokens } = this.state;
    // starts at the end of the last one or at 0 if it's the first recorded
    const startTime = recordedTokens.length > 0 ? recordedTokens[recordedTokens.length - 1].endTime : 0;
    const endTime = this.audioRef.current.currentTime;
    this.setState({
      recordedTokens: [
        ...recordedTokens,
        { phraseOrdinalInOriginal: this.state.currentPhraseOrdinal, startTime, endTime },
      ],
    });
    console.log("start", startTime);
    console.log("end", endTime);
  };

  nextPhrase = () => {
    this.setState({ currentPhraseOrdinal: this.state.currentPhraseOrdinal + 1 });
  };
  slowDownAudio = () => this.audioRef.current.playbackRate > 0.4
    ? this.audioRef.current.playbackRate -= 0.4
    : null;
  speedUpAudio = () => this.audioRef.current.playbackRate < 1.8
    ? this.audioRef.current.playbackRate += 0.4
    : null;

  handleFinished = async () => {
    /**
     * WHEN FINISHED, generate the word_phrases for all phrases on the backend.  Send the backend the phrase ids, the
     * backend will split each phrase by space, comma, whatever else, to get to the individual strings.  It will then
     * search word table for each and send back response of the following. Indices are concatted to strings in case
     * there are two of the same string in the same phrase and user wants to take different actions for each. Unlikely,
     * but might as well plan for it:
     * {
     *    <phrase id>: {
     *      resolved: arrayOf(<word-obj>), --> looked for string and found a single word in word table
     *      homonymsToResolve: {
     *        <string + _ + instance in phrase>: arrayOf(<word-obj>),
     *        ...
      *     },
     *      noWordsFoundToResolve: arrayOf(<string + _ + instance in phrase>)
     *    },
     *    ...
     *  }
     * It is then the responsibility of the frontend to open a modal if any of those objects contain homonym or
     * noWordsFound.  Pass the modal the object above.
     *
     * In the modal, the user is given the opportunity to resolve the homonyms and noWordsFound, or elect to have us
     * ignore that phrase.
     *  - for homonyms, given info about all the homonyms and can select one or decide to ignore.
     *  - for noWordsFound, has option to add word as a Proper noun or ignore.
     *
     *  Modal passes back same object, but with all user-resolved stuff moved from
     *  homonymsToResolve/noWordsFoundToResolve to resolved.  If a phrase has anything in either of those two, filter
     *  out its corresponding token.
     *
     *  Finally, send the request below, except also with a wordIds key which is an array of word ids, from which we
     *  will make the word_phrases.
     */
    let resolveWordsForPhrasesData = await api.tokens.getResolveWordsForPhrases(this.props.phrases);
    resolveWordsForPhrasesData = resolveWordsForPhrasesData.data;
    const hasUnresolvedPhrases = Object.keys(resolveWordsForPhrasesData).find(phraseId =>
      Object.keys(resolveWordsForPhrasesData[phraseId].homonymsToResolve || {}).length > 0 ||
      Object.keys(resolveWordsForPhrasesData[phraseId].noWordsFoundToResolve || {}).length > 0,
    );

    if (hasUnresolvedPhrases) {
      this.setState({ userResolveWordsModalOpen: true, dataForUserResolveWords: resolveWordsForPhrasesData });
    } else {
      this.handleSubmitTokens(resolveWordsForPhrasesData);
    }
  };

  // can be called by this.handleFinished if there were no unresolved, or by callback from UserResolveWords modal if so
  handleSubmitTokens = resolveWordsForPhrasesData => {
    // const tokensWithPhraseIds = this.state.recordedTokens.map(token => ({
    //     startTime: token.startTime,
    //     endTime: token.endTime,
    //     phraseId: this.props.phrases.find(phrase => phrase.ordinalInOriginal === token.phraseOrdinalInOriginal).id,
    //   }),
    // );
    //api.tokens.post(tokensWithPhraseIds, this.props.audioId);
  };

  render() {
    const { phrases } = this.props;
    const { currentPhraseOrdinal } = this.state;
    const sortedPhrases = phrases.sort((a, b) => a.ordinalInOriginal - b.ordinalInOriginal);
    const phraseElements = sortedPhrases.map(phrase =>
      <Phrase selected={currentPhraseOrdinal === phrase.ordinalInOriginal} key={phrase.id} phrase={phrase} />
    );
    return (
      <div>
        <button onClick={this.handleFinished}>Finish</button>
        <audio
          ref={this.audioRef /* so we can control it */}
          controls
          id="audio-player"
          src='http://localhost:7777/audio-download/test'>
          Could not load audio
        </audio>
        <button onClick={this.slowDownAudio}>Slow down audio</button>
        <button onClick={this.speedUpAudio}>Speed up audio</button>
        {phraseElements}
      </div>
    );
  }
}
