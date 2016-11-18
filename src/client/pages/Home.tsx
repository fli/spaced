import * as React from 'react';

import SignUpForm from '../components/SignUpForm';

export default class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <h1>Spaced repetition</h1>
        <h2>Sign up here</h2>
        <SignUpForm />
      </div>
    );
  }
}