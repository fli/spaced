import * as React from 'react';
import { render } from 'react-dom';

import history from './history';

import App from './App';

const APP_NAME = 'Spaced';

render(
  <App name={APP_NAME} loggedIn={false} />,
  document.getElementById('root')
);