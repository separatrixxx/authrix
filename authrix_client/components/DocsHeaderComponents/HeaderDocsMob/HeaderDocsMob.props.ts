import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface HeaderDocsMobProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    translations: {
        authrix: string,
        docs: string,
        switchLocale: string,
    },
    otherLocale: 'en' | 'ru',
}
