import { Map } from 'immutable';

const redditItem = (state = Map(), action = {}) => {
  switch (action.type) {
    case 'FETCH_SUBREDDIT_SUCCESS':
      return state.mergeDeep({
        entities: action.data.entities.item,
        result: Object.getOwnPropertyNames(action.data.entities.item)
      });

    default:
      return state;
  }
};

export default redditItem;
