import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders label initial if no image', () => {
    const { getByText } = render(<Avatar label="John" />);
    expect(getByText('J')).toBeTruthy();
  });
});
