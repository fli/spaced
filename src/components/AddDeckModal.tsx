import * as React from 'react';

interface Props {
  addDeck: (name: string) => Promise<boolean>;
  fetchDecks: () => void;
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default class AddDeckModal extends React.Component<Props, {}> {
  state = {
    name: '',
    isSubmitting: false
  }

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value
    });
  }

  cancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.closeDialog();
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({
      isSubmitting: true
    });
    await this.props.addDeck(this.state.name.trim());
    this.setState({
      isSubmitting: false
    });
    this.props.closeDialog();
  }

  render() {
    const { name, isSubmitting } = this.state;
    return (
      <div hidden={!this.props.isDialogOpen}>
        <form onSubmit={this.handleSubmit}>
          <h1>Create New Deck</h1>
          <p>
            <input type="text" placeholder="Deck Name" value={name} onInput={this.handleInput} />
          </p>
          <p>
            <button type="reset" onClick={this.cancel} disabled={isSubmitting}>Cancel</button>
            <button type="submit" disabled={name.trim() === '' || isSubmitting}>Save</button>
          </p>
        </form>
      </div>
    );
  }
}