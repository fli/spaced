declare module 'history/createBrowserHistory' {
  export interface Location {
    pathname: string;
    search: string;
    hash: string;
    state?: any;
    key?: string;
  }
  type Listener = (location: Location, action: string) => void;
  interface History {
    location: Location
    push: (path: string, state?: any) => void;
    listen: (listener: Listener) => () => void;
  }
  export default function createBrowserHistory(): History;
}