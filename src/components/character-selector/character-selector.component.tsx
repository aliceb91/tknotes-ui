import styles from './character-selector.module.scss';
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';

interface CharacterSelector {
  characters: string[];
  currentCharacter: string;
  setCurrentCharacter: (selected: string) => void;
  playerIndicator: string;
  clearSearch: () => void;
  noteFilter: () => void;
}

export function CharacterSelector(props: CharacterSelector) {

  const handleChange = (event: any) => {
    props.setCurrentCharacter(event.target.value)
    if (props.playerIndicator === "Player Character") {
      localStorage.setItem('currentCharacter', event.target.value)
    }
    if (props.playerIndicator === "Opponent Character") {
      props.clearSearch()
    }
    console.log(event.target.value)
  }
  
  return (
    <FormControl fullWidth sx={{
      m: 1,
      minWidth: 325,
      maxWidth: 325,
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {color: '#32C791 !important'},
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#32C791 !important'}
    }}>
      <InputLabel id="demo-simple-select-label">{props.playerIndicator}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.currentCharacter}
        label={props.playerIndicator}
        onChange={handleChange}
      >
        {
          props.characters.map(character => {
            return (
              <MenuItem key={character} value={character}> {character}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}