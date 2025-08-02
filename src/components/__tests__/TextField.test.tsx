import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextField } from '../TextField';

describe('TextField', () => {
  it('renders with label', () => {
    const { getByText } = render(<TextField label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('shows error message', () => {
    const { getByText } = render(<TextField error="Invalid" />);
    expect(getByText('Invalid')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField placeholder="Type here" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'abc');
    expect(onChangeText).toHaveBeenCalledWith('abc');
  });
});
