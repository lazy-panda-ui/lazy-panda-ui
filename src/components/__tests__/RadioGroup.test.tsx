import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RadioGroup } from '../RadioGroup';

describe('RadioGroup', () => {
  it('renders options', () => {
    const { getByText } = render(
      <RadioGroup options={['A', 'B']} value="A" onChange={function() {}} />
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('calls onChange when option pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <RadioGroup options={['A', 'B']} value="A" onChange={onChange} />
    );
    fireEvent.press(getByText('B'));
    expect(onChange).toHaveBeenCalledWith('B');
  });
});
