import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

const mockEpisodeList = [{id: 1, name: "Tester McTestersen"}, {id: 2, name: "Tester McTestersen 2"}];

describe('Sidebar Component', () => {
  it('renders a sidebar with links', () => {
    render(<Sidebar episodes={mockEpisodeList} selectedEpisode={"Tester McTestersen"} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
