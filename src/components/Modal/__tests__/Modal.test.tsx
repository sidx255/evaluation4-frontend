
// snapshot test for Modal component

import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../index';

describe('Modal', () => {
  it('should render correctly', () => {
    const { container } = render(<Modal isOpen={false} onClose={function (): void {
      throw new Error('Function not implemented.');
    // eslint-disable-next-line react/no-children-prop
    } } children={undefined} />);
    expect(container).toMatchSnapshot();
  }); 
});
