import styles from './note-input.module.scss';
import {TextField, Box, Stack, Button} from '@mui/material';
import {useState} from 'react';

interface NoteInput {
  setPlayerNotes: (note: any[]) => void;
  createNote: (playerNote: string) => void;
  noteFilter: () => void;
}

export function NoteInput(props: NoteInput) {
  const [currentText, setCurrentText] = useState('');

  function handleClick() {
    props.createNote(currentText)
    setCurrentText('')
    props.noteFilter();
  }

  function keyPress(key: any) {
    if (key.keyCode === 13) {
      handleClick()
    }
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          padding: '8px',
        }}
      >
        <TextField fullWidth 
        label="Note Entry" 
        id="fullWidth" 
        value={currentText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentText(event.target.value);
        }}
        onKeyDown={(key) => keyPress(key)}
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{paddingBottom: '8px', paddingRight: '8px', display: 'flelx', flexDirection: 'row-reverse'}}>
      {
        currentText === ''
        ? <Button variant="contained" disabled>Save Note</Button>
        : <Button variant="contained"
          onClick={() => handleClick()}
          >Save Note</Button>
      }
      </Stack>
    </>
  )
}