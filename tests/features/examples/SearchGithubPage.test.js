import React from 'react';
import { shallow } from 'enzyme';
import { SearchGithubPage } from '../../../src/features/examples/SearchGithubPage';

describe('examples/SearchGithubPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SearchGithubPage {...props} />
    );

    expect(
      renderedComponent.find('.examples-search-github-page').length
    ).toBe(1);
  });
});
