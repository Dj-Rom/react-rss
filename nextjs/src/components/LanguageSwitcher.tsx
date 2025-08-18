'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const locales = ['en', 'de'];

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex gap-2">
            <select
                name="language"
                id="language"
                onChange={changeLanguage}
                value={currentLocale}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded"
            >
                {locales.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc === 'en' ? 'English' : 'Deutsch'}
                    </option>
                ))}
            </select>
        </div>
    );
}
