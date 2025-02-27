import React, { useCallback, useEffect, useState } from 'react';
import { AuthrixWidgetProps } from './AuthrixWidget.interface';
import { useStyles } from './AuthrixWidget.styles';
import { locales } from './locales';


export const AuthrixWidget = ({ locale = 'en', text = {}, isAuthenticating, onAuthData }: AuthrixWidgetProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const styles = useStyles();
    const currentLocale = locales[locale];
    const confirmationText = text.confirmationText || currentLocale.confirmationText;
    const [buttonText, setButtonText] = useState<string>(text.buttonText || currentLocale.buttonText);

    const handleAuthResponse = useCallback((event: MessageEvent) => {
        if (event.data?.source !== 'authrix-content-script') return;

        if (event.data.type === 'AUTH_RESPONSE') {
            if (onAuthData) {
                onAuthData(event.data.data);
            }
        }
    }, [onAuthData]);


    useEffect(() => {
        if (isAuthenticating && !text.buttonText) {
            setButtonText(currentLocale.you_are_signed_in);
        }
    }, [isAuthenticating]);

    useEffect(() => {
        window.addEventListener('message', handleAuthResponse);

        return () => {
            window.removeEventListener('message', handleAuthResponse);
        };
    }, [handleAuthResponse]);

    const handleAuth = async () => {
        if (typeof window === 'undefined' || isAuthenticating) return;

        try {
            const currentDomain = window.location.host;

            const event = new CustomEvent('authrix-request', {
                detail: {
                    message: confirmationText,
                    domain: currentDomain
                },
                bubbles: true,
                composed: true
            });

            window.dispatchEvent(event);
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <button style={styles.getButtonStyles(isHovered, isActive)}
            onClick={handleAuth}
            disabled={isAuthenticating}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}>
            <svg style={styles.getSvgStyles()}
                viewBox="0 0 300 300"
                fill="currentColor">
                <g>
                    <polygon points="130,138.8 130,83.4 102.4,138.7" />
                    <path d="M170,139.1l129.7,0.8C295,67.8,240.1,9.4,170,0V139.1z" />
                    <path d="M126.7,0.5C54.9,11.8,0,74.4,0,150v0c0,25.2,6.1,49,16.9,69.9L126.7,0.5z" />
                    <polygon points="300,150 300,150 300,150" />
                    <path d="M130,159l-37.7-0.2l-48.9,97.7c22.8,23.2,52.9,39,86.6,43.5V159z" />
                    <path d="M170,159.3V300c70.1-9.4,125-67.8,129.7-139.9L170,159.3z" />
                </g>
            </svg>
            {buttonText}
        </button>
    );
};
