import { combineReducers } from 'redux-immutable';
import routing from './routing';
import subreddit from './subreddit';
import redditItem from './redditItem';

export default combineReducers({
  routing,
  subreddit,
  redditItem
});
