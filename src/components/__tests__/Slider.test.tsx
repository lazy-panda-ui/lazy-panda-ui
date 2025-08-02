import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider } from '../Slider';

describe('Slider', () => {
  it('renders with value', () => {
    const { toJSON } = render(
      <Slider value={0.5} onValueChange={function() {}} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
