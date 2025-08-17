'use client';
import  Link  from 'next/link';
import {useLocale, useTranslations} from "next-intl";

const Page = () => {
    const t = useTranslations('about')
  return (
    <>
      <section data-testid="about-page">
        <h1>{t('a')}</h1>
        <span>{t('b')}</span>
        <span>My Skills:</span>
        <p>JS,TS,PHP,HTML,CSS,SCSS,React,Redux,</p>
        <br />
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React Course
        </a>
      </section>

      <Link href={`/${useLocale()}`}>{t('c')}</Link>
    </>
  );
};

export default Page;
