import React from 'react';
import PropTypes from 'prop-types';

export default class UserResolveWords extends React.Component {
  static propTypes = {
    resolveWordsForPhrasesData: PropTypes.objectOf( // keys of object are phrase ids
      PropTypes.shape({
        resolved: PropTypes.arrayOf(
          PropTypes.object, // these are word objects
        ),
        homonymsToResolve: PropTypes.objectOf( // keys are <string + "_" + instance>
          PropTypes.arrayOf(
            PropTypes.object, // these are word objects... the homonyms
          )
        ),
        noWordsFoundToResolve: PropTypes.arrayOf(
          PropTypes.string, // array of <string + "_" + instance>
        ),
      }),
    ),
  };

  state = {

  };

  render() {
    return (
      <div className="user-resolve-words">

      </div>
    );
  }
}
