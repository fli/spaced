import * as React from 'react';

import { get, post } from '../fetch';

interface State {
  decks: any;
}

export default class AddCard extends React.Component<{}, State> {
  constructor() {
    super()
    this.state = {
      decks: null
    }
  }
  dialog: any | null = null;

  async componentDidMount() {
    const response = await get('/api/decks');
    const { decks } = await response.json();
    this.setState({ decks });
  }

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.target.selectedOptions[0].value === 'add' && this.dialog) {
      this.dialog.showModal();
    }
  }

  render() {
    const { decks } = this.state;
    return (
      <form>
        <label htmlFor="deck">Deck</label>
        <select name="deck" disabled={decks === null} onChange={this.handleSelect}>
          <option></option>
          {decks && decks.map(({id, name}: any) => <option value={id} key={id}>{name}</option>)}
          <option value={'add'}>Add deck...</option>
        </select>
        <dialog id="addDeck" ref={(dialog) => this.dialog = dialog}>
          <p>Hi there!</p>
        </dialog>
      </form>
    );
  }
}