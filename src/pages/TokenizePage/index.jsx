import React from 'react';
import ChooseContent from '../../components/Tokenize/ChooseContent';
import Tokenizer from '../../components/Tokenize/Tokenizer';
import './styles.css';

export default class TokenizePage extends React.Component {
    state = {
      phrases: ['No phrases added'],
      currentPhraseIndex: 0,
      audioFile: null,
      audioName: null,
      audioPlayback: 1,
      tokens: [],

      displaying: 'chooseContent',
    };

    constructor(props) {
      super(props);
      this.audioElement = document.createElement('audio');
      this.audioElement.controls = true;
    }

    handleContentDownloaded = ({ audioRecord, phrases }) => {
      this.setState({ audioName: audioRecord.name, audioId: audioRecord.id, phrases, displaying: 'tokenizer' });
    };

    render() {
      const { displaying, audioName, audioId, phrases } = this.state;

      return (
        <div>
          {displaying === 'chooseContent' && (
            <ChooseContent
              onDownloadContent={({audioRecord, phrases}) => this.handleContentDownloaded({audioRecord, phrases})}
            />
          )}
          {displaying === 'tokenizer' && (
            <Tokenizer
              audioId={audioId}
              audioName={audioName}
              phrases={phrases}
            />
          )}
        </div>
      );
    }
}
