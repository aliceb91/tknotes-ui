import styles from './search-field.module.scss';
import {Autocomplete, TextField} from '@mui/material'

interface SearchField {
  oppCharacter: string;
  currentMoveList: any[];
}

export function SearchField(props: SearchField) {

  return (
    <Autocomplete 
      disablePortal
      id="Select Move"
      options={props.currentMoveList.map((move) => ({label: move.command, id: move._id}))}
      sx={{
        m: 1,
        minWidth: 325,
        maxWidth: 325
      }}
      renderInput={(params) => <TextField {...params} label="Move" />}
    />
  )
}