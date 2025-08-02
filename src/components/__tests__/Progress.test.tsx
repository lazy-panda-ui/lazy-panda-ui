import React from 'react';
import { render } from '@testing-library/react-native';
import { Progress } from '../Progress';

describe('Progress', () => {
  it('renders with value', () => {
    const { toJSON } = render(<Progress value={0.5} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
