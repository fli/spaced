import * as React from 'react';
import { get } from '../fetch';

interface Props {
}

interface State {
  cards: any;
}

export default class Cards extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cards: undefined
    }
  }

  async componentDidMount() {
    const response = await get('/api/cards');
    const { cards } = await response.json();
    this.setState({ cards });
  }

  render() {
    const { cards } = this.state;
    if (cards === undefined) {
      return <p>Loading...</p>
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Deck</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(({front, back, name, due_date, card_id}: any) => (
              <tr key={card_id}>
                <td>{front}</td>
                <td>{back}</td>
                <td>{name}</td>
                <td>{due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}
