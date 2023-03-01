import styles from './character-panel.module.scss';

interface CharacterPanel {
  characters: string[];
  oppCharacterSet: (selected: any) => void;
  clearSearch: () => void;
}

export function CharacterPanel(props: CharacterPanel) {

  return (
    <div className={styles.panelArea}>
      {props.characters.map(character => {
        return (
          <div 
            key={character} 
            className={styles.square} 
            style={{backgroundImage: `url(/tk-icons/${character}.png)`}}
            onClick={() => {
              console.log(`setting opponent character to ${character}`)
              props.oppCharacterSet(character)
              props.clearSearch()
            }}
           >
          </div>
        )
      })}
    </div>
  )
}