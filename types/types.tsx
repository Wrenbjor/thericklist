export interface RMCharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string; 
    episode: string[];
    url: string; 
    created: string;
  }

  export interface RMEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[]; // Array of URLs
    url: string; // URL
    created: string; // Date in ISO format
  }
  
  export interface RMLocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[]; // Array of URLs
    url: string; // URL
    created: string; // Date in ISO format
  }

  export interface AllEpisodes {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: RMEpisode[];
  }

  export interface AllCharacters {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: RMCharacter[];
  }