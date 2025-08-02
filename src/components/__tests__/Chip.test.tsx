import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from '../Chip';

describe('Chip', () => {
  it('renders label', () => {
    const { getByText } = render(<Chip label="Chip" />);
    expect(getByText('Chip')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip label="Chip" onPress={onPress} />);
    fireEvent.press(getByText('Chip'));
    expect(onPress).toHaveBeenCalled();
  });
});
