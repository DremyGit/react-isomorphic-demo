import { Schema, arrayOf } from 'normalizr';

const redditItemSchema = new Schema('item', { idAttribute: 'title'});
const subredditSchema = new Schema('subreddit', { idAttribute: 'subredditName'});

subredditSchema.define({
  children: arrayOf({
    data: redditItemSchema
  })
});


export { redditItemSchema, subredditSchema }
