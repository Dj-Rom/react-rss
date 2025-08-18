import { useTheme } from '../../hooks/useTheme';
import styles from '../../css/header.module.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={styles.themeToggle}
            onClick={() => {
                toggleTheme();
            }}
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
        >
            {theme === 'light' ? '☀️' : '🌙'}
        </div>
    );
}

export default ThemeToggle;
