import * as React from 'react';

import SignUpForm from '../components/SignUpForm';
const { jumbotron } = require('./Home.css');

export default class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <div className={jumbotron}>
        </div>
        <SignUpForm />
      </div>
    );
  }
}
