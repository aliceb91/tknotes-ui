import styles from './character-selector.module.scss';
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import {useState} from 'react';

interface CharacterSelector {
  characters: string[];
}

export function CharacterSelector(props: CharacterSelector) {
  const [character, setCharacter] = useState('');

  const handleChange = (event: any) => {
    setCharacter(event.target.value)
    console.log(event.target.value)
  }
  
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Player Character</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={character}
        label="Player Character"
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