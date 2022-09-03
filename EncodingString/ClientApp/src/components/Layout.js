import React, { Component } from 'react';
import { Encode } from './Encode';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Encode />
      </div>
    );
  }
}
