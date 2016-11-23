import * as React from 'react';

import { post } from '../fetch';

const { container } = require('./SignUpForm.css');

interface State {
  email?: string;
  isSubmitting?: boolean;
  requestSuccess?: null | boolean;
}

export default class SignUpForm extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      email: '',
      isSubmitting: false,
      requestSuccess: null
    }
  }

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      email: event.currentTarget.value
    })
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, isSubmitting } = this.state;
    this.setState({ isSubmitting: true });
    const response = await post('/api/signup', { email });
    this.setState({ isSubmitting: false, requestSuccess: response.ok });
  }

  render() {
    const { email, isSubmitting, requestSuccess } = this.state;
    if (email === undefined) return null;
    if (requestSuccess) {
      return <p>Verification email sent! Check your email to finish creating your account</p>;
    } else {
      return (
      <form onSubmit={this.handleSubmit} className={container}>
        <label hidden>Email</label>
        <input name="email" type="email" onInput={this.handleInput} value={email} placeholder="Email address" />
        <button disabled={email.trim() === '' || isSubmitting}>Create a free account</button>
        {requestSuccess === false && <p>Error sending verification email</p>}
      </form>
    );
    }
  }
}