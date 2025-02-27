import { IconProps } from './Icon.props';
import styles from './Icon.module.css';
import { ReactNode } from 'react';
import BurgerIcon from './icons/burger.svg';
import CloseIcon from './icons/close.svg';
import cn from 'classnames';


export const Icon = ({ type, className, onClick }: IconProps): ReactNode => {
    let IconComponent = null;

    switch (type) {
        case 'burger':
            IconComponent = BurgerIcon;
            break;
        case 'close':
            IconComponent = CloseIcon;
            break;
        default:
            return null;
    }

    return (
        <IconComponent className={cn(styles.icon, className)} onClick={onClick} />
    );
};
