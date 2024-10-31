import { toast } from 'react-toastify';

export const useNotification = () => {

    function notify(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
        toast(message, {
            type: type
        });
    }

    return {
        notify
    }
}