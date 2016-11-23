import * as React from 'react';
import history from '../history';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  setLoggedIn: (loggedIn: boolean) => void;
}

interface State {
}

export default class SignOutButton extends React.Component<Props, State> {

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.props.setLoggedIn(false);
    history.push('/');
  }

  render() {
    const { setLoggedIn, ...rest }: Props = this.props;
    return (
      <div onClick={this.handleClick} {...rest} >Sign out</div>
    );
  }
}
