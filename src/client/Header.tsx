import * as React from 'react';

import Link from './components/Link';
import SignOutButton from './components/SignOutButton';

const { brand, button, collapse, header, leftContainer, outerContainer, navItem, rightFlex } = require('./Header.css');

interface Props {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

class Header extends React.PureComponent<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.loggedIn !== nextProps.loggedIn;
  }

  render() {
    const { loggedIn, setLoggedIn } = this.props;
    // return (
    //   <header className={header}>
    //     <nav className={outerContainer}>
    //       <ul className={leftContainer}>
    //         <li><Link to='/' className={brand}>Learnding</Link></li>
    //         {loggedIn && <li className={collapse}><Link to='/'>Decks</Link></li>}
    //         {loggedIn && <li className={collapse}><Link to='/addcard'>Add Card</Link></li>}
    //         {loggedIn && <li className={collapse}><Link to='/cards'>Browse Cards</Link></li>}
    //       </ul>
    //       {loggedIn && <SignOutButton className={button + ' ' + rightFlex} setLoggedIn={setLoggedIn} />}
    //       {!loggedIn && <Link to='/signin' className={button + ' ' + rightFlex}>Sign In</Link>}
    //     </nav>
    //   </header>
    // );
    return (
      <header className={header}>
        <Link to='/' className={brand}>Learnding</Link>
        {/*<button type="button" className={button}>Menu</button>
        <nav className={collapse}>
          {loggedIn && <li ><Link to='/'>Decks</Link></li>}
          {loggedIn && <li><Link to='/addcard'>Add Card</Link></li>}
          {loggedIn && <li><Link to='/cards'>Browse Cards</Link></li>}
        </nav>*/}
      </header>
    );
  }
}

export default Header;