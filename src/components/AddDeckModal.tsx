import * as React from 'react';

interface HTMLDialogElement extends HTMLElement {
  close: () => void;
  showModal: () => void;
}

interface Props {
  addDeck: (name: string) => void;
  fetchDecks: () => void;
}

export default class AddDeckModal extends React.Component<Props, {}> {
  state = {
    name: ''
  }

  dialog: HTMLDialogElement | null = null;

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    });
  }

  cancel = (event: React.FormEvent<HTMLButtonElement>) => {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  render() {
    const { name } = this.state;
    return (
      <dialog ref={(dialog: HTMLDialogElement) => this.dialog = dialog}>
        <form>
          <h1>Create New Deck</h1>
          <p>
            <input type="text" placeholder="Deck Name" value={name} onInput={this.handleInput} />
          </p>
          <p>
            <button onClick={this.cancel}>Cancel</button>
            <button type="submit">Save</button>
          </p>
        </form>
      </dialog>
    );
  }
}