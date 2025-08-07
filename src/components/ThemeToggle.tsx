import { useTheme } from './../hooks/useTheme.tsx';
import styles from './../css/header.module.css';
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <h1
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </h1>
    </div>
  );
}

export default ThemeToggle;
