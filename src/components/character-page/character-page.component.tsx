import styles from './character-page.module.scss';
import { useEffect, useRef, useState, } from 'react';
import {CharacterPanel} from '../character-panel/character-panel.component';
import {CharacterSelector} from '../character-selector/character-selector.component';
import {NotesArea} from '../notes-area/notes-area.component';

export interface MoveData {
  _id: string;
  characterName: string;
  command: string;
  hitLevel: string;
  damage: string;
  startUpFrame: string;
  blockFrame: string;
  hitFrame: string;
  counterHitFrame: string;
  notes: string;
}

export function CharacterPage() {
  let isLoading = useRef(true);
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [currentMoveList, setcurrentMoveList] = useState([]);
  const [oppCharacter, setOppCharacter] = useState('');
  const [move, setMove] = useState<MoveData | null>(null);
  const [width, setWidth] = useState(0);
  const [currentSelect, setCurrentSelect] = useState<{label:string, id: string} | null>(null)
  const [playerNotes, setPlayerNotes] = useState<any[]>([]);

  useEffect(() => {
    let url: string;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = `http://localhost:8000/charList`
    } else {
      url = `https://tknotes-api.vercel.app/charList`
    }

    if (isLoading.current) {
      const currentCharacterStored = localStorage.getItem('currentCharacter')
      const playerNotesStored = localStorage.getItem('playerNotes')

      if (playerNotesStored) {
        setPlayerNotes(JSON.parse(playerNotesStored))
      }

      setMove({
        _id: "-",
         characterName: "-",
        command: "-",
        hitLevel: "-",
        damage: "-",
        startUpFrame: "-",
        blockFrame: "-",
        hitFrame: "-",
        counterHitFrame: "-",
        notes: "-"
      })
      if (currentCharacterStored) {
        setCurrentCharacter(currentCharacterStored)
      }
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

  function oppCharacterSet(selected: string) {
    setOppCharacter(selected)

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

  function clearSearch() {
    setCurrentSelect(null)
    setMove({
      _id: "-",
       characterName: "-",
      command: "-",
      hitLevel: "-",
      damage: "-",
      startUpFrame: "-",
      blockFrame: "-",
      hitFrame: "-",
      counterHitFrame: "-",
      notes: "-"
    })
  }

  useEffect(() => {
    setWidth(() => window.innerWidth)
    console.log(window.innerWidth)
  }, [width])

    return(
      <div className={styles.fullPage}>
        <div className={styles.pageLeft}>
          <CharacterSelector 
            characters={characters} 
            currentCharacter={currentCharacter} 
            setCurrentCharacter={setCurrentCharacter} 
            playerIndicator="Player Character" 
            clearSearch={clearSearch}
          />
          {
            width < 480
            ? <CharacterSelector 
                characters={characters} 
                currentCharacter={oppCharacter} 
                setCurrentCharacter={oppCharacterSet} 
                playerIndicator="Opponent Character" 
                clearSearch={clearSearch}
              />
            : <>
                <h2 className={styles.title}>Opponent Character</h2>
                <CharacterPanel 
                  characters={characters} 
                  oppCharacterSet={oppCharacterSet} 
                  clearSearch={clearSearch}
                />
              </>
          }
        </div>
        <div className={styles.pageRight}>
          <NotesArea 
            oppCharacter={oppCharacter}
            currentMoveList={currentMoveList} 
            currentCharacter={currentCharacter} 
            move={move} setMove={setMove} 
            currentSelect={currentSelect} 
            setCurrentSelect={setCurrentSelect}
            playerNotes={playerNotes}
            setPlayerNotes={setPlayerNotes}
          />
        </div>
      </div>
    )
}