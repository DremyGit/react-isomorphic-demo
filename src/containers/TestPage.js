import React from 'react';
import { Link } from 'react-router';

export default class TestPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Link to="/cat">cat</Link>
      </div>
    )
  }
}

