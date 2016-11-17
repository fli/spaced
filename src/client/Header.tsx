import * as React from 'react';

import Link from './components/Link';

const { button, header, navContainer, navItem } = require('./Header.css');

interface Props {
  loggedIn: boolean;
}

export default class Header extends React.PureComponent<Props, {}> {
  render() {
    const { loggedIn } = this.props;
    return (
      <header className={header}>
        <nav>
          <ul className={navContainer}>
            <li><Link to='/'>Home</Link></li>
            {loggedIn && <li><Link to='/'>Decks</Link></li>}
            {loggedIn && <li><Link to='/addcard'>Add Card</Link></li>}
            {loggedIn && <li>Browse Cards</li>}
            {!loggedIn && <li><Link to='/signin' className={button}>Sign In</Link></li>}
            {/*!loggedIn && <li className={button}>Sign Up</li>*/}
          </ul>
        </nav>
      </header>
    );
  }
}
