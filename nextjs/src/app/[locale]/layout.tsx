import {NextIntlClientProvider, useLocale} from 'next-intl';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import requestConfig from '@/i18n/request';
import { routing } from '@/i18n/routing';
import ReduxProvider from '@/redux/ReduxProvider';
import {ThemeProvider} from "../../../context/ThemeContext";
import BodyThemeSync from "@/components/BodyThemeSync"; // 👈 Server wrapper

export default async function LocaleLayout({ children, params }) {
    const { locale } = params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    };

    setRequestLocale(locale);

    const config = await requestConfig({ requestLocale: locale });

    return (
        <html lang={locale}>
        <body>
        <ReduxProvider>
            <NextIntlClientProvider locale={config.locale} messages={config.messages}>
                <ThemeProvider>
                    <BodyThemeSync />
                    {children}
                </ThemeProvider>
            </NextIntlClientProvider>
        </ReduxProvider>
        </body>
        </html>
    );
}
