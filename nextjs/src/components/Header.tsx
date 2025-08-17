import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './../../css/header.module.css';
import {Link} from '@/i18n/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {useTranslations} from "next-intl";

type Props = {
  initialValue: string;
  onSearch: (query: string) => void;
};

const Header = ({ initialValue, onSearch }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    onSearch(trimmed);
  };
const t = useTranslations('header')
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        {' '}
        <Link href={'/about'} className={styles.about_link}>
          {t('title')}
        </Link>
        <ThemeToggle />
      </div>
      <LanguageSwitcher/>
      <form onSubmit={handleSubmit} className={styles.headerForm} role="form">
        <input
            className={styles.headerInput}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={t('searchPlaceholder')}
          aria-label="Search input"
        />
        <button type="submit" className={styles.headerButton}>{t('searchPlaceholder')}</button>
      </form>
    </header>
  );
};

export default Header;
