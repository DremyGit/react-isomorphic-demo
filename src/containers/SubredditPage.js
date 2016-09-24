import React from 'react';
import { connect } from 'react-redux';
import RedditItem  from '../components/RedditItem/RedditItem';
import { fetchSubredditIfNeed } from '../actions/subreddits'
import { dispatchFetch } from '../helpers/utils'

// Map some states in store into component props by react-redux
@connect(state => ({
  subreddits: state.getIn(['subreddit', 'entities']),
  redditItems: state.getIn(['redditItem', 'entities'])
}))
export default class SubredditPage extends React.Component {

  // Some actions which should be finished before rendering on server
  static fetches = [
    fetchSubredditIfNeed
  ];

  // Some actions after component mounted in client only,
  // because there is no DOM in server, the lifecycle of the component
  // would get to componentWillMount only.
  componentDidMount() {
    dispatchFetch(SubredditPage.fetches, this.props)
  }

  render() {
    // Get data from props, and params is provided by react-router
    const { redditItems, subreddits, params } = this.props;
    const subredditName = params.subredditName;

    // Show loading before the data fetched
    const isSubredditFetched = subreddits && subreddits.get(subredditName);
    if (!isSubredditFetched) {
      return <div>Loading</div>;
    }

    const subredditItems = subreddits.getIn([subredditName, 'children']);

    return (
      <div>
        <h1>{subredditName}</h1>
        <div>
          {subredditItems.toSeq().map(item => {
            var data = item.get('data');
            var theItem = redditItems.get(data);
            return <RedditItem key={data} item={theItem}/>
          }).toArray()}
        </div>
      </div>
    )
  }
}
