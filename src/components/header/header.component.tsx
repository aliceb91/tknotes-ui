import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.span}>BirdsHomePage</span>
    </header>
  )
}