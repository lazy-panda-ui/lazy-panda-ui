import React from 'react';
import { render } from '@testing-library/react-native';
import { ImageList } from '../ImageList';

describe('ImageList', () => {
  it('renders images', () => {
    const images = [{ uri: 'img1.png' }, { uri: 'img2.png' }];
    const { getAllByTestId } = render(<ImageList images={images} />);
    expect(getAllByTestId(/^image-list-item-/).length).toBe(2);
  });
});
