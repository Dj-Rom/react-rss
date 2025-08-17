'use client';

import { Provider } from 'react-redux';
import { store } from './store';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
