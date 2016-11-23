import * as React from 'react';

import { get, post } from '../fetch';
import Deck from '../../shared/types/Deck';

interface Props {
  decks?: Deck[];
  addCard: (deckId: number, front: string, back: string) => Promise<boolean>;
  fetchDecks: () => void;
  openDialog: () => void;
}

interface State {
  deckId?: number;
  front?: string;
  back?: string;
  isSubmitting?: boolean;
}

export default class AddCard extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      deckId: 0,
      front: '',
      back: '',
      isSubmitting: false
    }
  }

  componentDidMount() {
    this.props.fetchDecks();
  }

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.selectedOptions[0].value === '-1') {
      this.props.openDialog();
      return;
    }
    this.setState({ deckId: parseInt(event.currentTarget.value) });
  }

  handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'front':
        this.setState({ front: value });
        return;
      case 'back':
        this.setState({ back: value });
        return;
    }
  }
  
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      isSubmitting: true
    });
    const { deckId, front, back } = this.state;
    if (!deckId || !front || !back) { return; }
    const ok = await this.props.addCard(deckId, front.trim(), back.trim());
    if (ok) {
      this.setState({
        isSubmitting: false,
        front: '',
        back: ''
      });
    } else {
      this.setState({
        isSubmitting: false
      });
    }

  }

  render() {
    const { decks } = this.props;
    const { deckId, front, back, isSubmitting } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="deck">Deck</label>
        <p>
          <select name="deck" disabled={decks === null || isSubmitting} onChange={this.handleSelect} value={deckId}>
            <option value={0}>
              {decks ? 'Select a deck' : 'Loading...'}
            </option>
            {decks && decks.map(({id, name}: any) => <option value={id} key={id}>{name}</option>)}
            <option value={-1}>Add deck...</option>
          </select>
        </p>
        <p>
          <label htmlFor="front">Front</label>
          <textarea name="front" value={front} onInput={this.handleInput} disabled={isSubmitting}/>
        </p>
        <p>
          <label htmlFor="back">Back</label>
          <textarea name="back" value={back} onInput={this.handleInput} disabled={isSubmitting}/>
        </p>
        <button
          disabled={deckId < 1 || front === '' || back === '' || isSubmitting}>
          Add
        </button>
      </form>
    );
  }
}