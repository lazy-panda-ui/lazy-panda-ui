import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Select } from '../Select';

describe('Select', () => {
  it('renders placeholder', () => {
    const { getByText } = render(
      <Select options={['One', 'Two']} value="" onChange={() => {}} placeholder="Pick" />
    );
    expect(getByText('Pick')).toBeTruthy();
  });

  it('calls onChange when option selected', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Select options={['One', 'Two']} value="" onChange={onChange} />
    );
    // Open the modal
    fireEvent.press(getByTestId('select-trigger'));
    // Select the option
    fireEvent.press(getByTestId('select-option-One'));
    expect(onChange).toHaveBeenCalledWith('One');
  });
});
