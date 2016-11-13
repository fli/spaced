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
}


export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: history.location.pathname,
      loggedIn: this.props.loggedIn,
      decks: null
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
  }

  setLoggedIn = (loggedIn: boolean) => {
    this.setState({
      loggedIn
    });
  }

  locationToComponent = (location: string) => {
    const { loggedIn, decks } = this.state;
    const signInPage = <SignIn setLoggedIn={this.setLoggedIn} />;
    switch (location) {
      case '/': return (loggedIn ? <Decks decks={decks} fetchDecks={this.fetchDecks} />: <Home />);
      case '/addcard': return (loggedIn ? <AddCard />: signInPage);
      case '/signin': return (loggedIn ? <Decks decks={decks} fetchDecks={this.fetchDecks} />: signInPage);
      default: return <h1>Not found</h1>;
    }
  }

  render() {
    const { location, loggedIn } = this.state;
    return (
      <div>
        <Header loggedIn={loggedIn} />
        {this.locationToComponent(location)}
        <AddDeckModal addDeck={this.addDeck} fetchDecks={this.fetchDecks} />
      </div>);
  }
}