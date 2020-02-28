import React from 'react';
import { shallow } from 'enzyme';
import { JinghangDemo } from '../../../src/features/examples/JinghangDemo';

describe('examples/JinghangDemo', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <JinghangDemo {...props} />
    );

    expect(
      renderedComponent.find('.examples-jinghang-demo').length
    ).toBe(1);
  });
});
