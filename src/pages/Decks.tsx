import * as React from 'react';

import { get, post } from '../fetch';

interface Props {
  decks: any
  fetchDecks: () => void
}

export default class DecksContainer extends React.Component<Props, {}> {

  componentDidMount() {
    const { decks, fetchDecks } = this.props;
    if (!decks) {
      fetchDecks();
    }
  }

  render() {
    const { decks } = this.props;
    return (
      <div>
        <Decks decks={decks} />
      </div>
      );
  }
}

class Decks extends React.Component<{decks: any[]}, {}> {
  render() {
    const { decks } = this.props;
    if (decks) {
      return (
        <div>
          <h1>Decks</h1>
          <ul>
            {decks.map(({id, name}) => <li key={id}>{name}</li>)}
          </ul>
          <button>Create deck</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Decks</h1>
          <ul>
            <li>Loading...</li>
            <li>Loading...</li>
          </ul>
          <button disabled>Create deck</button>
        </div>
      );
    }
  }
}