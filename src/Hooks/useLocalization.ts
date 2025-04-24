import { useMemo } from 'react';
import { i18nLocale } from '@/Localization/i18nLocale';
import { AppString } from '@/Localization/AppString';

type AppStringKey = keyof typeof AppString;

export const useLocalization = () => {
    return useMemo(() => {
        const localizedStrings: Record<AppStringKey, string> = {} as Record<
            AppStringKey,
            string
        >;

        (Object.keys(AppString) as AppStringKey[]).forEach((key) => {
            localizedStrings[key] = i18nLocale.t(AppString[key]);
        });

        return localizedStrings;
    }, []);
};