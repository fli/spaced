import * as React from 'react';
import Link from '../components/Link';

interface Props {
  deck: any
}

interface State {
}

export default class DeckDetails extends React.Component<Props, State> {
  render() {
    const { deck } = this.props;
    if (deck === undefined ) {
      return <p>Loading...</p>
    } else {
      const { id, name } = deck;
      return (
        <div>
          <h1>
            {name}
          </h1>
          <Link to={`/study/decks/${id}`}>
            Study now
          </Link>
        </div>
      );
    }
  }
}
