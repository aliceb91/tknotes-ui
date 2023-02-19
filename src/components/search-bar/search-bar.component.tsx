import styles from './search-bar.module.scss';
import {CharacterSelector} from '../character-selector/character-selector.component';
import {SearchField} from '../search-field/search-field.component';
import React, { useEffect, useRef, useState } from 'react'; 

interface SearchBar {
  characters: string[]
}

export function SearchBar(props: SearchBar) {
  const [currentCharacter, setcurrentCharacter] = useState('')
  const [currentMoveList, setcurrentMoveList] = useState([])

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

  console.log(styles)

  return (
    <div className={styles.bar}>
      <CharacterSelector characters={props.characters} characterSet={characterSet}></CharacterSelector>
      <SearchField currentCharacter={currentCharacter} currentMoveList={currentMoveList}></SearchField>
    </div>
  )
}