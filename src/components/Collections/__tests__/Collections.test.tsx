
// snapshot test for Collections component

import React from 'react';
import { render } from '@testing-library/react';

import Collections from '../index';

describe('Collections', () => {
  it('should render correctly', () => {
    const { container } = render(<Collections />);
    expect(container).toMatchSnapshot();
  });
});