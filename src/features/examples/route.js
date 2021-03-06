// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  WelcomePage,
  CounterPage,
  Layout,
  JinghangDemo,
  GithubGraphqlApiPage,
  SearchGithubPage,
} from './';

export default {
  path: '/',
  name: 'Examples',
  component: Layout,
  childRoutes: [
    { path: 'examples/', name: 'Welcome page', component: WelcomePage },
    { path: 'examples/counter', name: 'Counter page', component: CounterPage },
    { path: 'examples/jinghang-demo', name: 'Jinghang demo', component: JinghangDemo},
    { path: 'examples/github-graphql-api', name: 'Github graphql api page', component: GithubGraphqlApiPage },
    { path: 'examples/search-github', name: 'Search github page', component: SearchGithubPage, isIndex: true },
  ],
};
