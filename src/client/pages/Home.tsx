import * as React from 'react';

import SignUpForm from '../components/SignUpForm';
const { jumbotron } = require('./Home.css');

export default class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <div className={jumbotron}>
          <h1>Tools to help you learn things</h1>
        </div>
        <SignUpForm />
      </div>
    );
  }
}