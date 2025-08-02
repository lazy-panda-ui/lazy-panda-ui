import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CheckBox } from '../CheckBox';

describe('CheckBox', () => {
  it('renders checked state', () => {
    const { getByTestId } = render(<CheckBox checked={true} onChange={function() {}} testID="checkbox" />);
    expect(getByTestId('checkbox')).toBeTruthy();
  });

  it('calls onChange when pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<CheckBox checked={false} onChange={onChange} testID="checkbox" />);
    fireEvent.press(getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
