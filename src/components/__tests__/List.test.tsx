import React from 'react';
import { render } from '@testing-library/react-native';
import { List } from '../List';

describe('List', () => {
  it('renders items', () => {
    const items = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' }
    ];
    const { getByText } = render(<List items={items} />);
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });
});
