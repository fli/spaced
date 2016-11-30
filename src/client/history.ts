import { createBrowserHistory, ListenCallback, Location } from 'history';

const history: any = {
  listen: (callback: ListenCallback) => {},
  push: (path: string, state?: any) => {},
  location: {
    pathname: '',
    search: ''
  }
};

if (!process.env.PGPORT) {
  const _history = createBrowserHistory();
  history.listen = _history.listen;
  history.push = _history.push;
  history.location.pathname = _history.location.pathname;
  history.location.search = _history.location.search;
}

export default history;