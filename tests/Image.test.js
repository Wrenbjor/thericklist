import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../components/Image';

describe('Image Component', () => {
  it('renders an image with the correct src and alt text', () => {
    render(<Image src="/test-image.jpg" alt="Test" width="200" height="200" />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test');
  });
});
