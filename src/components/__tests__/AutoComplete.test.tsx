import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AutoComplete } from '../AutoComplete';

describe('AutoComplete', () => {
  it('renders input', () => {
    const { getByPlaceholderText } = render(
      <AutoComplete data={['A', 'B']} onSelect={function() {}} placeholder="Type" />
    );
    expect(getByPlaceholderText('Type')).toBeTruthy();
  });

  it('calls onSelect when option selected', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <AutoComplete data={['A', 'B']} onSelect={onSelect} />
    );
    // Focus input and type 'A' to show options
    fireEvent(getByTestId('autocomplete-input'), 'focus');
    fireEvent.changeText(getByTestId('autocomplete-input'), 'A');
    fireEvent.press(getByTestId('autocomplete-option-A'));
    expect(onSelect).toHaveBeenCalledWith('A');
  });
});
