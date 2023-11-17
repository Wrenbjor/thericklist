import React from 'react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
      // Return a simple img element with all props except "layout"
      const { layout, ...rest } = props;
      return <img {...rest} />;
    },
  }));