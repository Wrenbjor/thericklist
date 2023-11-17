import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../components/List';

const mockEpisodeList = [{id: 1, name: "Tester McTestersen"}, {id: 2, name: "Tester McTestersen 2"}];

describe('List Component', () => {
  it('renders a list with items', () => {
    render(<List items={mockEpisodeList} />);
    const listItems = screen.getAllByRole('link');
    expect(listItems).toHaveLength(2);
  });
});
