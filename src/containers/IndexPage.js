import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    const subredditList = [ 'dog', 'cat' ];
    return (
      <div>
        <ul>
          {subredditList.map(subreddit =>
            <li key={subreddit}><Link to={`/${subreddit}`}>{subreddit}</Link></li>
          )}
        </ul>
      </div>
    )
  }
}

