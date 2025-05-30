import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    translations: {
        introduction: string,
        service_registration: string,
        check_service: string,
        widget: string,
        extension: string,
    },
}
