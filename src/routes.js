import configureStore from './stores';
import Layout from './components/Layout/Layout';
import IndexPage from './containers/IndexPage';
import TestPage from './containers/TestPage';
import SubredditPage from './containers/SubredditPage';

const routes = [
  { path: '/',
    component: Layout,
    indexRoute: { component: IndexPage },
    childRoutes: [
      {path: 'test', component: TestPage },
      {path: ':subredditName', component: SubredditPage }
    ]
  }
];
export default routes;
