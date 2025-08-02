import { Text } from 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Paper } from '../Paper';

describe('Paper', () => {
  it('renders children', () => {
    const { getByText } = render(<Paper><Text>Paper Content</Text></Paper>);
    expect(getByText('Paper Content')).toBeTruthy();
  });
});
