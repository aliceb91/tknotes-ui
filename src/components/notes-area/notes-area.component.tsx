import styles from './notes-area.module.scss';
import {SearchField} from '../search-field/search-field.component';
import {FrameData} from '../frame-data/frame-data.component';
import {NoteInput} from '../note-input/note-input.component';
import { MoveData } from '../character-page/character-page.component';

interface NotesArea {
  oppCharacter: string;
  currentMoveList: any[];
  currentCharacter: string;
  move: MoveData | null;
  setMove: (move: MoveData | null) => void
  currentSelect: {label:string, id: string} | null;
  setCurrentSelect: (select: {label:string, id: string} | null) => void;
  playerNotes: any[];
  setPlayerNotes: (currentNotes: any) => any;
}

export function NotesArea(props: NotesArea) {

  function createNote(playerNote: string) {
    console.log(props.currentCharacter, props.oppCharacter, props.move, playerNote)
    if (props.currentCharacter && props.oppCharacter && props.move && playerNote) {
      const note = {
        playerCharacter: props.currentCharacter,
        oppCharacter: props.oppCharacter,
        command: props.move.command,
        playerNote
      }
      props.setPlayerNotes((currentNotes: any) => {
        currentNotes.push(note)
      return currentNotes
      })
      localStorage.setItem('playerNotes', JSON.stringify(props.playerNotes))
      console.log(props.playerNotes)
    }
  }

  return (
    <div className={styles.border}>
      <div className={styles.topRow}>
        <h2>{props.oppCharacter}</h2>
        <SearchField 
          oppCharacter={props.oppCharacter} 
          currentMoveList={props.currentMoveList} 
          setMove={props.setMove} 
          currentSelect={props.currentSelect} 
          setCurrentSelect={props.setCurrentSelect}
        />
      </div>
      <FrameData move={props.move}></FrameData>
      <NoteInput setPlayerNotes={props.setPlayerNotes} createNote={createNote}></NoteInput>
    </div>
  )
}