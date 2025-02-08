import React, { useCallback, useEffect, useState } from 'react';
import { AuthrixWidgetProps } from './AuthrixWidget.interface';
import { useStyles } from './AuthrixWidget.styles';
import { locales } from './locales';


export const AuthrixWidget = ({ locale = 'en', text = {}, isAuthenticating,  onAuthData }: AuthrixWidgetProps) => {
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
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            {buttonText}
        </button>
    );
};
