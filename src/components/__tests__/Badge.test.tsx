import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders with value', () => {
    const { getByText } = render(<Badge value={5} />);
    expect(getByText('5')).toBeTruthy();
  });
});
