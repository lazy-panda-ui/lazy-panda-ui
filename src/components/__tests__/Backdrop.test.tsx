import React from 'react';
import { render } from '@testing-library/react-native';
import { Backdrop } from '../Backdrop';

describe('Backdrop', () => {
  it('renders when open', () => {
    const { toJSON } = render(<Backdrop open={true} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
