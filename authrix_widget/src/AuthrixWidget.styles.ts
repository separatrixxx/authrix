import { useEffect, useState } from 'react';


type StyleObject = {
    [key: string]: React.CSSProperties | undefined;
};

const baseStyles: StyleObject = {
    authrixWidget: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        background: '#1F1F1F',
        fontFamily: "'Roboto', sans-serif",
        color: '#FFF',
        fontWeight: 600,
        fontSize: '16px',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        outline: '2px solid #1F1F1F',
        outlineOffset: '-2px',
        transitionDuration: '300ms',
        alignItems: 'center',
        gap: '12px',
    },
    svg: {
        width: '18px',
    }
};

const mobileStyles: StyleObject = {
    authrixWidget: {
        fontSize: '12px',
        padding: '6px 12px',
        borderRadius: '6px',
    },
    svg: {
        width: '14px',
    }
};

const hoverStyles: StyleObject = {
    authrixWidget: {
        color: '#1F1F1F',
        background: '#FFF',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
};

const activeStyles: StyleObject = {
    authrixWidget: {
        color: '#1F1F1F',
        background: '#FFF',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
};

export const useStyles = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [supportsHover, setSupportsHover] = useState<boolean>(true);

    useEffect(() => {
        const checkWindowProperties = () => {
            setIsMobile(window.innerWidth <= 580);
            setSupportsHover(window.matchMedia('(hover: hover)').matches);
        };

        checkWindowProperties();

        window.addEventListener('resize', checkWindowProperties);

        return () => window.removeEventListener('resize', checkWindowProperties);
    }, []);

    return {
        getButtonStyles: (isHovered: boolean, isActive: boolean) => ({
            ...baseStyles.authrixWidget,
            ...(isMobile ? mobileStyles.authrixWidget : {}),
            ...(isActive ? activeStyles.authrixWidget : {}),
            ...(supportsHover && isHovered ? hoverStyles.authrixWidget : {})
        }),
        getSvgStyles: () => ({
            ...baseStyles.svg,
            ...(isMobile ? mobileStyles.svg : {})
        })
    };
};
