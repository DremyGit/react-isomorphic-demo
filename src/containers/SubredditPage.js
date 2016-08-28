import React from 'react';
import { connect } from 'react-redux';
import RedditItem  from '../components/RedditItem/RedditItem';
import { fetchSubredditIfNeed } from '../actions/subreddits'
import { dispatchFetch } from '../helpers/utils'

@connect(state => ({
  subreddits: state.getIn(['subreddit', 'entities']),
  redditItems: state.getIn(['redditItem', 'entities'])
}))
export default class SubredditPage extends React.Component {

  static fetches = [
    fetchSubredditIfNeed
  ];

  componentWillMount() {
    dispatchFetch(SubredditPage.fetches, this.props)
  }

  render() {
    const { redditItems, subreddits, params } = this.props;
    const subredditName = params.subredditName;
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
          })}
        </div>
      </div>
    )
  }
}
