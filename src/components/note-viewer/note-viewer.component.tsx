import styles from './note-viewer.module.scss';
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { MoveData } from '../character-page/character-page.component';

interface NoteViewer {
  filteredNotes: any[];
  playerNotes: any[];
  setPlayerNotes: (currentNotes: any) => any;
  setCurrentSelect: (select: {label:string, id: string} | null) => void;
  setMove: (move: MoveData | null) => void;
  currentMoveList: any[];
}

export function NoteViewer(props: NoteViewer) {

  const rows = props.filteredNotes

  function handleClick(note: any) {
    props.setPlayerNotes(props.playerNotes.filter((playerNote) => {
      return playerNote._id !== note._id;
    }))
    localStorage.setItem('playerNotes', JSON.stringify(props.playerNotes.filter((playerNote) => {
      return playerNote._id !== note._id;
    })))
  }

  function changeView(note: any) { {

    console.log('noteclick', note.command)

    const theMove = props.currentMoveList.find((x) => {
      return x.command === note.command
    })
    if (theMove) {
      props.setMove(theMove);
      props.setCurrentSelect({label: `${theMove.command}`, id: `${theMove._id}`})
    }
    console.log(theMove)
  }
}

  return (
    <TableContainer component={Paper} sx={{height: 'calc(100% - 18.7em)', overflow: 'scroll-y'}}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Command</TableCell>
            <TableCell align="left">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row._id}
              onClick={(event: any) => {
                if (!event.target.matches('button, button *')) {
                  changeView(row)
                }
              }}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.command}
              </TableCell>
              <TableCell align="left">
                <div className={styles.note}>
                  {row.playerNote}
                  <IconButton aria-label="delete" onClick={() => handleClick(row)}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}