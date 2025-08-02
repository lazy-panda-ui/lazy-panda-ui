import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Fab } from '../Fab';

describe('Fab', () => {
  it('renders with label', () => {
    const { getByText } = render(<Fab label="Add" onPress={function() {}} />);
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Fab label="Add" onPress={onPress} />);
    fireEvent.press(getByText('Add'));
    expect(onPress).toHaveBeenCalled();
  });
});
