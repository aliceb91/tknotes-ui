import styles from './notes-area.module.scss';
import {SearchField} from '../search-field/search-field.component';

interface NotesArea {
  oppCharacter: string;
  currentMoveList: any[];
}

export function NotesArea(props: NotesArea) {
  return (
    <div className={styles.border}>
      <div className={styles.topRow}>
        <h2>{props.oppCharacter}</h2>
        <SearchField oppCharacter={props.oppCharacter} currentMoveList={props.currentMoveList}></SearchField>
      </div>
    </div>
  )
}