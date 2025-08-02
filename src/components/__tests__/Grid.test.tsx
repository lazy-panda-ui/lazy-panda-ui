import { Text } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Grid } from '../Grid';

describe('Grid', () => {
  it('renders children', () => {
    const { getByText } = render(<Grid><Text>Grid Item</Text></Grid>);
    expect(getByText('Grid Item')).toBeTruthy();
  });
});
