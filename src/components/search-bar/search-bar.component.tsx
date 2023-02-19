import styles from './search-bar.module.scss';
import {CharacterSelector} from '../character-selector/character-selector.component';
import React, { useEffect, useRef, useState } from 'react'; 

interface SearchBar {
  characters: string[]
}

export function SearchBar(props: SearchBar) {
  const [characters, setCharacters] = useState(props.characters);
  
  return (
    <CharacterSelector characters={characters}></CharacterSelector>
  )
}