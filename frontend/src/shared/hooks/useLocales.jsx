import { useTranslation } from 'react-i18next';

import { allLangs, defaultLang } from './../../application/config';

import useSettings from './useSettings';

// config

// ----------------------------------------------------------------------

export default function useLocales() {
    const { i18n, t: translate } = useTranslation();

    const { onChangeDirectionByLang } = useSettings();

    const langStorage = localStorage.getItem('i18nextLng');

    const currentLang =
        allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

    const handleChangeLanguage = (newlang) => {
        i18n.changeLanguage(newlang);
        onChangeDirectionByLang(newlang);
    };

    return {
        allLangs,
        currentLang,
        onChangeLang: handleChangeLanguage,
        translate: (text, options) => translate(text, options),
    };
}
