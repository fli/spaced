import * as React from 'react';
import { render } from 'react-dom';

import history from './history';
import App from './App';
import * as constants from '../shared/constants';

interface MyWindow extends Window {
  __PRELOADED_STATE__: any
}

const preloadedState = (window as MyWindow).__PRELOADED_STATE__;
const stateContainer = document.querySelector('#__PRELOADED_STATE__');
if (stateContainer) {
  stateContainer.remove();
}

function renderApp(path: string, query: string) {
  render(
    <App
      name={constants.AppName}
      loggedIn={preloadedState.loggedIn}
      path={path}
      query={query}
      decks={preloadedState.decks}
    />,
    document.getElementById('root')
  );
}

history.listen(({pathname, search}: Location) => {
  renderApp(pathname, search);
});

renderApp(history.location.pathname, history.location.search);
