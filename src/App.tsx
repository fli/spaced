import * as React from 'react';
import { Location } from 'history/createBrowserHistory';

import AddCard from './pages/AddCard';
import AddDeckModal from './components/AddDeckModal';
import Decks from './pages/Decks';
import { get, post } from './fetch';
import history from './history';
import Header from './Header';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

interface Props {
  name: string;
  loggedIn: boolean;
}

interface State {
  location: string;
  loggedIn: boolean;
  decks: null | {id: number, name: string}[];
  isDialogOpen: boolean;
}


export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: history.location.pathname,
      loggedIn: this.props.loggedIn,
      decks: null,
      isDialogOpen: false
    }
    history.listen((location: Location, _) => {
      this.setState({
        location: location.pathname
      });
    });
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

  locationToComponent = (location: string) => {
    const { loggedIn, decks } = this.state;
    const signInPage = <SignIn setLoggedIn={this.setLoggedIn} />;
    const decksPage = <Decks decks={decks} fetchDecks={this.fetchDecks} openDialog={this.openDialog} />;
    const addCardsPage = <AddCard decks={decks} fetchDecks={this.fetchDecks} openDialog={this.openDialog}/>
    switch (location) {
      case '/': return (loggedIn ? decksPage : <Home />);
      case '/addcard': return (loggedIn ? addCardsPage : signInPage);
      case '/signin': return (loggedIn ? decksPage : signInPage);
      default: return <h1>Not found</h1>;
    }
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log(event.target);
  }

  render() {
    const { location, loggedIn, isDialogOpen } = this.state;
    return (
      <div onClick={this.handleClick}>
        <Header loggedIn={loggedIn} />
        {this.locationToComponent(location)}
        <AddDeckModal
          closeDialog={this.closeDialog}
          isDialogOpen={isDialogOpen}
          addDeck={this.addDeck}
          fetchDecks={this.fetchDecks}
        />
      </div>);
  }
}