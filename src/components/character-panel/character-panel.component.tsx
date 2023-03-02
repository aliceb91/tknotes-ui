import styles from './character-panel.module.scss';

interface CharacterPanel {
  characters: string[];
  oppCharacterSet: (selected: any) => void;
  clearSearch: () => void;
  noteFilter: () => void;
}

export function CharacterPanel(props: CharacterPanel) {

  return (
    <div className={styles.panelArea}>
      {props.characters.map(character => {
        return (
          <div 
            key={character} 
            className={`${styles.square}`} 
            style={{backgroundImage: `url(/tk-icons/${character}.png)`}}
            onClick={(event: any) => {
              console.log(`setting opponent character to ${character}`)
              props.oppCharacterSet(character)
              props.clearSearch()

              document.querySelectorAll(`.${styles.square}`).forEach(el => el.classList.remove(styles.activeCharacter));
              event.target.classList.add(styles.activeCharacter);
            }}
           >
          </div>
        )
      })}
    </div>
  )
}