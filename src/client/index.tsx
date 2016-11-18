import * as React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';

const APP_NAME = 'Spaced';

const history = createBrowserHistory();

function renderApp(path: string, query: string) {
  render(
    <App name={APP_NAME} loggedIn={false} path={path} query={query} />,
    document.getElementById('root')
  );
}
history.listen((location: Location, _) => {
  renderApp(location.pathname, location.search);
});
renderApp(history.location.pathname, history.location.search);
