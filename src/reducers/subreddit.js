import { Map } from 'immutable';

const subreddit = (state = Map(), action = {}) => {
  switch (action.type) {
    case 'FETCH_SUBREDDIT_SUCCESS':
      return state.mergeDeep({
        entities: action.data.entities.subreddit,
        result: Object.getOwnPropertyNames(action.data.entities.subreddit)
      });

    default:
      return state;
  }
};

export default subreddit;
