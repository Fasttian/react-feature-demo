/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';
import ApolloClient from 'apollo-boost'
import { ApolloProvider} from '@apollo/react-hooks';

function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

//graphQL Api 配置
const GITHUB_BASE_URL = `https://api.github.com/graphql`;
//出于演示方便和信任，请勿泄露本人的token，也可替换为使用者的
const GITHUB_PROSONAL_ACCESS_TOKEN= 'b1b956b9cdb2f39db4578ab1200a0518dc057678';

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      GITHUB_PROSONAL_ACCESS_TOKEN
    }`
  }
})

  
export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    const children = renderRouteConfigV3(this.props.routeConfig, '/');
    return (
      <Provider store={this.props.store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}
