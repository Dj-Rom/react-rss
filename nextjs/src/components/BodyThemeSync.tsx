'use client';

import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function BodyThemeSync() {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return null;
}
