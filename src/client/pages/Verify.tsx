import * as React from 'react';

import { post } from '../fetch';
import history from '../history';

interface Props {
  token: string;
  setLoggedIn: (loggedIn: boolean) => void;
}

interface State {
  password: string;
}

export default class Verify extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      password: ''
    };
  }

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value
    });
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await post('/api/users', {
      token: this.props.token,
      password: this.state.password
    });
    if (response.ok) {
      this.props.setLoggedIn(true);
      history.push('/');
    }
  }

  render() {
    const { password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onInput={this.handleInput} />
        </p>
        <button disabled={password.trim() === ''}>Create your account</button>
      </form>
    );
  }
}
