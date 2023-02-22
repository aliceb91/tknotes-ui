import styles from './notes-area.module.scss';
import {SearchField} from '../search-field/search-field.component';
import React, { useEffect, useRef, useState } from 'react';
import {FrameData} from '../frame-data/frame-data.component';

interface NotesArea {
  oppCharacter: string;
  currentMoveList: any[];
}

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

export function NotesArea(props: NotesArea) {
  const [move, setMove] = useState<MoveData>();

  return (
    <div className={styles.border}>
      <div className={styles.topRow}>
        <h2>{props.oppCharacter}</h2>
        <SearchField oppCharacter={props.oppCharacter} currentMoveList={props.currentMoveList} setMove={setMove}></SearchField>
      </div>
      <FrameData move={move}></FrameData>
    </div>
  )
}