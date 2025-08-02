import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  it('renders', () => {
    const { toJSON } = render(<Skeleton />);
    expect(toJSON()).toMatchSnapshot();
  });
});
