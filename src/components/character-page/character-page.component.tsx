import stytles from './character-page.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { CharacterSelector } from '../character-selector/character-selector.component';
import {SearchBar} from '../search-bar/search-bar.component'; 

export function CharacterPage() {
  let isLoading = useRef(true)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    let url: string;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = `http://localhost:8000/charList`
    } else {
      url = `https://tknotes-api.vercel.app/charList`
    }

    if (isLoading.current) {
      const characterStored = localStorage.getItem('characterList')
      if (!characterStored) {
        fetch(url)
        .then((res) => res.json())
        .then((characterList) => {
          localStorage.setItem('characterList', JSON.stringify(characterList))
          setCharacters(characterList)
          isLoading.current = false
        })
      } else {
        setCharacters(JSON.parse(characterStored))
        isLoading.current = false
      }
    }
  }, [characters])

  return (
    <SearchBar characters={characters}/>
  )
}