import fetch from 'isomorphic-fetch';
import { normalize, arrayOf} from 'normalizr'
import { subredditSchema } from '../reducers/schema';

function fetchSubredditFetching() {
  return {
    type: 'FETCH_SUBREDDIT_FETCHING'
  }
}

function fetchSubredditSuccess(data) {
  return {
    type: 'FETCH_SUBREDDIT_SUCCESS',
    data: data
  }
}

function shouldFetchSubreddit(subredditName, state) {
  return !(state.getIn(['subreddit', 'entities', subredditName]));
}

//test

export const fetchSubredditIfNeed = (params) => {
  const subredditName = params.subredditName;
  return (dispatch, getState) => {
    if (subredditName && shouldFetchSubreddit(subredditName, getState())) {
      dispatch(fetchSubredditFetching());
      return fetch(`https://www.reddit.com/r/${subredditName}.json`)
        .then(res => res.json())
        .then(data => {
          if (!data || !data.data) {
            throw new Error('No data');
          }
          data.data.subredditName = subredditName;
          data = normalize(data.data, subredditSchema);
          return dispatch(fetchSubredditSuccess(data));
        });
    } else {
      return Promise.resolve();
    }
  }
};