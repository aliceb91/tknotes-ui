import styles from './character-page.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import {CharacterPanel} from '../character-panel/character-panel.component';
import {CharacterSelector} from '../character-selector/character-selector.component';
import {SearchField} from '../search-field/search-field.component';
import {NotesArea} from '../notes-area/notes-area.component';

export function CharacterPage() {
  let isLoading = useRef(true)
  const [characters, setCharacters] = useState([])
  const [currentCharacter, setcurrentCharacter] = useState('')
  const [currentMoveList, setcurrentMoveList] = useState([])

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

  function characterSet(selected: string) {
    setcurrentCharacter(selected)
    let url: string;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = `http://localhost:8000/moves/${selected}`
    } else {
      url = `https://tknotes-api.vercel.app/moves/${selected}`
    }

    fetch(url)
    .then((res) => res.json())
    .then((moveList) => {
      setcurrentMoveList(moveList)
    })
  }

  return (
    <div className={styles.fullPage}>
      <div className='page-left'>
        <CharacterSelector characters={characters} characterSet={characterSet}></CharacterSelector>
        <CharacterPanel/>
      </div>
      <div className='page-right'>
        <SearchField currentCharacter={currentCharacter} currentMoveList={currentMoveList}></SearchField>
        <NotesArea/>
      </div>
    </div>
  )
}