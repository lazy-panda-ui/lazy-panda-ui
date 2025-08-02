import React from 'react';
import { render } from '@testing-library/react-native';
import { AppBar } from '../AppBar';

describe('AppBar', () => {
  it('renders title', () => {
    const { getByText } = render(<AppBar title="App Title" />);
    expect(getByText('App Title')).toBeTruthy();
  });
});
