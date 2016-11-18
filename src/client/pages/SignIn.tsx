import * as React from 'react';

import { get, post } from '../fetch';

interface Props {
  setLoggedIn: (loggedIn: boolean) => void;
}

interface State {
  email?: string;
  password?: string;
}

export default class SignIn extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = this.state;
    const response = await post('/api/signin', { email, password });
    this.props.setLoggedIn(response.ok);
  }

  handleInput = ({ currentTarget: { name, value } }: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>Email</label>
          <input name="email" type="email" onInput={this.handleInput} value={email} />
        </p>
        <p>
          <label>Password</label>
          <input name="password" type="password" onInput={this.handleInput} value={password} />
        </p>
        <button>Submit</button>
      </form>
    );
  }
}