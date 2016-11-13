import * as React from 'react';
import Link from './components/Link';

interface Props {
  loggedIn: boolean;
}

export default class Header extends React.PureComponent<Props, {}> {
  render() {
    const { loggedIn } = this.props;
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            {!loggedIn && <li><Link to='/signin'>Sign In</Link></li>}
            {!loggedIn && <li>Sign Up</li>}
            {loggedIn && <li><Link to='/'>Decks</Link></li>}
            {loggedIn && <li><Link to='/addcard'>Add Card</Link></li>}
            {loggedIn && <li>Browse Cards</li>}
          </ul>
        </nav>
      </header>
    );
  }
}
