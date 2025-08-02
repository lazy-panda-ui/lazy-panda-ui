import React from 'react';
import { render } from '@testing-library/react-native';
import { Typography } from '../Typography';

describe('Typography', () => {
  it('renders with correct text', () => {
    const { getByText } = render(<Typography>Text</Typography>);
    expect(getByText('Text')).toBeTruthy();
  });
});
