import toast from 'react-hot-toast';


export const ToastSuccess = (message: string | undefined): void => {
    if (message) {
        toast.error(message, {
            icon: null,
            style: {
                borderRadius: '8px',
                color: 'var(--textDark)',
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
            },
        });
    }
};

export const ToastError = (message: string | undefined): void => {
    if (message) {
        toast.error(message, {
            icon: null,
            style: {
                borderRadius: '8px',
                color: 'var(--error)',
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
            },
        });
    }
};