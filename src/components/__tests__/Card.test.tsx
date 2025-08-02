import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '../Card';
import { Text } from 'react-native';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });
});
