"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainDisplayGrid from '../components/MainDisplayGrid';
import { RMCharacter, RMEpisode } from '../types/types';

const Page = () => {
  const [episodes, setEpisodes] = useState<RMEpisode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState<string | null>(null);
  const [characters, setCharacters] = useState<RMCharacter[]>([]);
  
  
  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    setCharacters(data.results); // Set the characters state directly here.
  };
  
  const fetchCharactersByEpisode = async (episodeId: number): Promise<RMCharacter[]> => {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    const episodeData = await response.json();
    const characters = await Promise.all(
      episodeData.characters.map(async (characterUrl: string) => {
        const characterResponse = await fetch(characterUrl);
        const character: RMCharacter = await characterResponse.json();
        return character;
      })
    );
    return characters.filter((character) => character.episode.includes(episodeData.url));
  };

  const handleEpisodeSelect = async (id: number) => {
    if (selectedEpisode === id) {
      const allCharacters = await fetchCharacters();
      setSelectedEpisode(null);
      setSelectedEpisodeName(null);
    } else {
      setSelectedEpisode(id);
      const selectedEpisode = episodes.find(episode => episode.id === id);
      if (selectedEpisode) {
        setSelectedEpisodeName(selectedEpisode.name);
      }
      const charactersData = await fetchCharactersByEpisode(id);
      setCharacters(charactersData);
    }
  };

  const fetchAllEpisodes = async () => {
    try {
      let response = await fetch('https://rickandmortyapi.com/api/episode');
      let data = await response.json();
      let episodes = data.results;
      const totalPages = data.info.pages;
  
      // Fetch episodes from remaining pages
      for (let page = 2; page <= totalPages; page++) {
        response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        data = await response.json();
        episodes = episodes.concat(data.results);
      }
  
      setEpisodes(episodes);
    } catch (error) {
      console.error('Error fetching all episodes:', error);
    }
  };

  
  useEffect(() => {
    fetchAllEpisodes();
    fetchCharacters();
  }, []);

  return (
    <div className="flex">
      <Sidebar 
        episodes={episodes.map(episode => ({ id: episode.id, name: episode.name }))}
        onEpisodeSelect={handleEpisodeSelect}
        selectedEpisode={selectedEpisode}
      />
      <MainDisplayGrid 
        characters={characters} 
        selectedEpisodeName={selectedEpisodeName} 
      />
    </div>
  );
};

export default Page;