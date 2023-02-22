import styles from './search-field.module.scss';
import {Autocomplete, TextField} from '@mui/material'
import { MoveData } from '../notes-area/notes-area.component';

interface SearchField {
  oppCharacter: string;
  currentMoveList: MoveData[];
  setMove: (move: any) => void;
}

export function SearchField(props: SearchField) {

  function handleChange(event: any, value: any) {
    
    const theMove = props.currentMoveList.find((x) => {
      return x._id === value.id
    })
    props.setMove(theMove)
  }

  return (
    <Autocomplete 
      disablePortal
      id="Select Move"
      options={props.currentMoveList.map((move) => ({label: move.command, id: move._id}))}
      onChange={handleChange}
      sx={{
        m: 1,
        minWidth: 325,
        maxWidth: 325
      }}
      renderInput={(params) => <TextField {...params} label="Move" />}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )
      }}
    />
  )
}