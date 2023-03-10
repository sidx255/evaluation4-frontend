
// snapshot test for ContentType component

import React from 'react';
import { render } from '@testing-library/react';

import ContentType from '../index';

describe('ContentType', () => {
  it('should render correctly', () => {
    const { container } = render(<ContentType />);
    expect(container).toMatchSnapshot();
  });
});
    