import * as React from 'react';
import history from '../history';

interface Props {
  to: string;
}

export default class Link extends React.PureComponent<Props, {}> {
  handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    history.push(this.props.to);

  }

  render() {
    return <a href={this.props.to} onClick={this.handleClick}>{this.props.children}</a>
  }
}