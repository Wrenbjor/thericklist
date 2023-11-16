import React from 'react';
import CustomImage from './Image';
import { RMCharacter } from '../types/types';


type MainDisplayGridProps = {
  characters: RMCharacter[];
  selectedEpisodeName: string | null;
};

const MainDisplayGrid: React.FC<MainDisplayGridProps> = ({ characters, selectedEpisodeName}) => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-center">{selectedEpisodeName ? `${characters.length} Characters from "${selectedEpisodeName}"` : 'Characters'}</h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* Render characters */}
          {characters.map((character) => (
            <div key={character.id} className="border rounded-lg shadow-lg p-2">
              <CustomImage src={character.image} alt={character.name} width={200} height={200} className="rounded-full" />
              <h3 className="text-center mt-2">{character.name}</h3>
              {/* ... */}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default MainDisplayGrid;