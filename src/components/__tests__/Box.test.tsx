import { Text } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Box } from '../Box';

describe('Box', () => {
  it('renders children', () => {
    const { getByText } = render(<Box><Text>Child</Text></Box>);
    expect(getByText('Child')).toBeTruthy();
  });
});
