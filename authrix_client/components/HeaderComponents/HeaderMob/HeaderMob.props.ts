import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface HeaderMobProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    translations: {
        authrix: string,
        switchLocale: string,
    },
    otherLocale: 'en' | 'ru',
}
