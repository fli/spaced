import * as React from 'react';

import { get, post } from '../fetch';

interface Props {
  decks: any[] | null;
  fetchDecks: () => void;
  openDialog: () => void;
}

export default class Decks extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    const { decks, openDialog } = this.props;
    if (decks) {
      return (
        <div>
          <h1>Decks</h1>
          {decks.length === 0 ?
            <p>You have no decks</p> :
            <ul>
              {decks.map(({id, name}) => <li key={id}>{name}</li>)}
            </ul>
          }
          <button onClick={this.props.openDialog}>Create deck</button>
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