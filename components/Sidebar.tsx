// Sidebar Component

import React from 'react';
import List from './List';

type SidebarProps = {
  episodes: { id: number; name: string }[];
  onEpisodeSelect: (id: number) => void;
  selectedEpisode: number | null;
};
const Sidebar: React.FC<SidebarProps> = ({ episodes, onEpisodeSelect, selectedEpisode }) => {
    return (
      <aside className="w-64 p-6 bg-gray-800 text-white border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <span className="text-sm font-semibold mb-3 text-gray-400">Toggle an episode to see the characters</span>
        <List items={episodes} onItemClick={onEpisodeSelect} selectedItemId={selectedEpisode} />
      </aside>
    );
  };

export default Sidebar;