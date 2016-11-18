import * as React from 'react';
import { parse } from 'querystring';

import AddCard from './pages/AddCard';
import AddDeckModal from './components/AddDeckModal';
import Decks from './pages/Decks';
import { get, post } from './fetch';
import Header from './Header';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Verify from './pages/Verify';

interface Props {
  name: string;
  loggedIn: boolean;
  path: string;
  query: string;
}

interface State {
  loggedIn?: boolean;
  decks?: null | {id: number, name: string}[];
  isDialogOpen?: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      decks: null,
      isDialogOpen: false
    }
  }

  fetchDecks = async () => {
    const response = await get('/api/decks');
    const { decks } = await response.json();
    this.setState({ decks });
  }

  addDeck = async (name: string) => {
    if (!this.state.decks) {
      return;
    }
    const response = await post('/api/decks', { name });
    if (response.ok) {
      const deck = await response.json();
      this.setState({
        decks: [...this.state.decks, deck]
      });
    }
    return response.ok; 
  }

  addCard = async (deckId: number, front: string, back: string) => {
    // if (!this.state.decks) {
    //   return;
    // }
    const response = await post('/api/cards', { deckId, front, back });
    if (response.ok) {
      // const deck = await response.json();
      // this.setState({
      //   decks: [...this.state.decks, deck] 
      // });
    }
    return response.ok;
  }

  setLoggedIn = (loggedIn: boolean) => {
    this.setState({
      loggedIn
    });
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    });
  }

  closeDialog = () => { this.setState({ isDialogOpen: false }); }

  locationToComponent = (path: string, query: string) => {
    const { loggedIn, decks } = this.state;
    if (decks === undefined) { return null; }
    const signInPage = <SignIn setLoggedIn={this.setLoggedIn} />;
    const decksPage = <Decks decks={decks} fetchDecks={this.fetchDecks} openDialog={this.openDialog} />;
    const addCardsPage = <AddCard decks={decks} fetchDecks={this.fetchDecks} addCard={this.addCard} openDialog={this.openDialog}/>
    switch (path) {
      case '/': return (loggedIn ? decksPage : <Home />);
      case '/addcard': return (loggedIn ? addCardsPage : signInPage);
      case '/signin': return (loggedIn ? decksPage : signInPage);
      case '/verify':
        const { token } = parse(query.substring(1));
        if (token === undefined) {
          return (loggedIn ? decksPage : <Home />);
        }
        return <Verify token={token} setLoggedIn={this.setLoggedIn} />
      default: return <h1>Not found</h1>;
    }
  }

  render() {
    const { loggedIn, isDialogOpen } = this.state;
    const { path, query } = this.props;
    if (loggedIn === undefined || isDialogOpen === undefined) { return null; }
    return (
      <div>
        <Header loggedIn={loggedIn} />
        {this.locationToComponent(path, query)}
        <AddDeckModal
          closeDialog={this.closeDialog}
          isDialogOpen={isDialogOpen}
          addDeck={this.addDeck}
          fetchDecks={this.fetchDecks}
        />
      </div>);
  }
}