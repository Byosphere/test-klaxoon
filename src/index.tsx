import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { DEFAULT_LANG } from './constants';
import { BookmarksContextProvider } from './contextes/BookmarksContext';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Loader from './components/loader/Loader';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: DEFAULT_LANG,
        interpolation: {
            escapeValue: false
        },
        debug: true
    });

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Loader />}>
                <BookmarksContextProvider>
                    <CssBaseline />
                    <App />
                </BookmarksContextProvider>
            </Suspense>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
