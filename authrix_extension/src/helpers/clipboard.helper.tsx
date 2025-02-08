import { ToastError, ToastSuccess } from "../components/Common/Toast/Toast";


export function copyToClipboard(copyText: string, successText: string, errorText: string) {
    navigator.clipboard.writeText(copyText)
        .then(() => {
            ToastSuccess(successText);
        })
        .catch(() => {
            ToastError(errorText);
        });
}
