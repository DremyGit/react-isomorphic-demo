import React from 'react';
import styles from './style.css';

const RedditItem = (props) => {
  return (
    <div>
      <a href=""><h2 className={styles.title}>{props.item.get('title')}</h2></a>
      <div>
        {
          props.item.get('thumbnail') !== 'self' ?
          <img className={styles.img} src={props.item.get('thumbnail')} /> : null
        }
      </div>
    </div>
  )
};

export default RedditItem;
