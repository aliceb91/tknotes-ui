import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CharacterPage} from '../components/character-page/character-page.component';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CharacterPage/>
    </ThemeProvider>
    )
}
