import * as React from 'react';

import { get, post } from '../fetch';

interface Props {
  decks: any[] | null;
  fetchDecks: () => void;
  openDialog: () => void;
}

export default class AddCard extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.fetchDecks();
  }

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.target.selectedOptions[0].value === 'add') {
      this.props.openDialog();
    }
  }

  render() {
    const { decks } = this.props;
    return (
      <form>
        <label htmlFor="deck">Deck</label>
        <p>
          <select name="deck" disabled={decks === null} onChange={this.handleSelect}>
            <option></option>
            {decks && decks.map(({id, name}: any) => <option value={id} key={id}>{name}</option>)}
            <option value={'add'}>Add deck...</option>
          </select>
        </p>
        <p>
          <label htmlFor="front">Front</label>
          <textarea name="front" />
        </p>
        <p>
          <label htmlFor="back">Back></label>
          <textarea name="back" />
        </p>
        <button>Add</button>
      </form>
    );
  }
}