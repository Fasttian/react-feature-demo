import React from 'react';
import { shallow } from 'enzyme';
import { GithubGraphqlApiPage } from '../../../src/features/examples';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GithubGraphqlApiPage />);
  expect(renderedComponent.find('.examples-github-graphql-api-page').length).toBe(1);
});
