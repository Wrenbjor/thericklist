"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainDisplayGrid from '../components/MainDisplayGrid';
import { RMCharacter, RMEpisode, AllEpisodes, AllCharacters } from '../types/types';

const Page = () => {
  const [episodes, setEpisodes] = useState<RMEpisode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedEpisodeName, setSelectedEpisodeName] = useState<string | null>(null);
  const [currentCharacterPage, setCurrentCharacterPage] = useState<number>(1);
  const [characters, setCharacters] = useState<RMCharacter[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data.results;
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

  const fetchCharactersByPage = async (page: number): Promise<AllCharacters> => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  const handleCharacterPageChange = (page: number) => {
    setCurrentCharacterPage(page);
  };

  const handleEpisodeSelect = async (id: number) => {
    if (selectedEpisode === id) {
      // If the selected episode is the same as the currently selected episode,
      // fetch all characters and set them as the current characters.
      const allCharacters = await fetchCharacters();
      setCharacters(allCharacters);
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
      // First, fetch the first page to get the total number of pages
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
      // Handle error as needed
    }
  };

  const fetchAllCharacters = async (): Promise<RMCharacter[]> => {
    try {
      // First, fetch the first page to get the total number of pages
      let response = await fetch('https://rickandmortyapi.com/api/character');
      let data = await response.json();
      let allCharacters = data.results;
      const totalPages = data.info.pages;
  
      // Fetch characters from remaining pages
      for (let page = 2; page <= totalPages; page++) {
        response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        data = await response.json();
        allCharacters = allCharacters.concat(data.results);
      }
  
      return allCharacters;
    } catch (error) {
      console.error('Error fetching all characters:', error);
      return []; // Return an empty array or handle the error as needed
    }
  };
  
  
  useEffect(() => {
    fetchAllEpisodes();
    fetchCharactersByPage(currentCharacterPage).then(data => {
      setCharacters(data.results);
    });
  }, [currentPage, currentCharacterPage]);

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