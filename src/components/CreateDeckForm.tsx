import * as React from 'react';

import { get, post } from '../fetch';

export default class CreateDeckForm extends React.Component<{addDeck: (deck: any) => void}, {name: string, isSubmitting: boolean}> {
  constructor() {
    super();
    this.state = {
      name: '',
      isSubmitting: false
    }
  }

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value,
      isSubmitting: this.state.isSubmitting
    })
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name } = this.state;
    if (!name.trim) {
      return;
    }
    this.setState({
      name,
      isSubmitting: true
    })
    const response = await post('/api/decks', { name });
    if (response.ok) {
      const deck = await response.json();
      this.props.addDeck(deck);
      this.setState({
        name: '',
        isSubmitting: false
      })
    } else {
      this.setState({
        name,
        isSubmitting: false
      })
    }
  }

  render() {
    const { name, isSubmitting } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Deck name" value={name} onInput={this.handleInput} />
        {' '}
        <button disabled={isSubmitting || name === ''}>Add Deck</button>
      </form>
    );
  }
}