import styles from './search-field.module.scss';
import {Autocomplete, TextField} from '@mui/material'
import { MoveData } from '../character-page/character-page.component';

interface SearchField {
  oppCharacter: string;
  currentMoveList: MoveData[];
  setMove: (move: MoveData | null) => void;
  currentSelect: {label:string, id: string} | null;
  setCurrentSelect: (select: {label:string, id: string} | null) => void;
  noteFilter: () => void;
  clearSearch: () => void;
}

export function SearchField(props: SearchField) {

  function handleChange(event: any, value: any, reason: any) {

    console.log(`handle change`, value)
  
    if(reason ==="clear") {
      props.clearSearch()
    }
    
    if(value === null) {
      value = ""
    }

    const theMove = props.currentMoveList.find((x) => {
      return x._id === value.id
    })
    console.log(theMove)
    if (theMove) {
      props.setMove(theMove);
      props.setCurrentSelect(value);
    }
  }

  return (
    <Autocomplete 
      isOptionEqualToValue={(option, value) => option.id === value.id}
      id="Select Move"
      options={props.currentMoveList.map((move) => ({label: move.command, id: move._id}))}
      value={props.currentSelect}
      onChange={handleChange}
      sx={{
        m: 1,
        minWidth: 325,
        maxWidth: 325,
        '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {color: '#32C791 !important'},
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#32C791 !important'}
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