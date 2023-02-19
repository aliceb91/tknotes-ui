import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CharacterPage} from '../components/character-page/character-page.component';
import { Header } from '@/components/header/header.component';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header/>
      <CharacterPage/>
    </ThemeProvider>
    )
}
