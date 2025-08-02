import React from 'react';
import { render } from '@testing-library/react-native';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('renders with message', () => {
    const { getByText } = render(<Alert message="Warning!" />);
    expect(getByText('Warning!')).toBeTruthy();
  });
});
