import { Text } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Stack } from '../Stack';

describe('Stack', () => {
  it('renders children', () => {
    const { getByText } = render(<Stack><Text>Stacked</Text></Stack>);
    expect(getByText('Stacked')).toBeTruthy();
  });
});
