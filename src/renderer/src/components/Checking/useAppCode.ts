import { useEffect, useState } from 'react';
import { validateAppCode } from '../../api/appCodeApi';
import { generateRandomString } from './helpers';

/**
 * 
 * @param onValidCode   const NOTIFICATION_TITLE = 'Title'
                const NOTIFICATION_BODY =
                    'Notification from the Renderer process. Click to log to console.'
                const CLICK_MESSAGE = 'Notification clicked'

                new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick =
                    () => console.log(CLICK_MESSAGE)
 * @returns 
 */

// Custom Hook for App Code Logic
export const useAppCode = (onValidCode: (data) => void) => {
    const [appCode, setAppCode] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [randomString, setRandomString] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Check and validate the app code on mount
    useEffect(() => {
        const storedAppCode = localStorage.getItem('appCode');
        if (storedAppCode) {
            validateExistingAppCode(storedAppCode);
        } else {
            setLoading(false);
            const newAppCode = generateRandomString();
            localStorage.setItem('appCode', newAppCode);
            setRandomString(newAppCode);
        }
    }, []);

    const validateExistingAppCode = async (code: string) => {
        setError('')
        setLoading(true);
        try {
            const response = await validateAppCode(code);
            if (response.status) {
                onValidCode(response.data); // Navigate to the dashboard
            } else {
                setError(response.message ?? "خطأ غير متوقع!")
            }
        } catch (err) {
            setError("خطأ غير متوقع!");
            /* localStorage.removeItem('appCode');
             const newAppCode = generateRandomString();
             localStorage.setItem('appCode', newAppCode);*/
            setRandomString(code);
        } finally {
            setLoading(false);
        }
    };

    const handleChecking = async () => {
        setError('')
        setLoading(true);
        var storedAppCode = localStorage.getItem('appCode');

        if (!storedAppCode) {
            const storedAppCode = generateRandomString();
            localStorage.setItem('appCode', storedAppCode);
            setRandomString(storedAppCode);
        }

        try {
            const response = await validateAppCode(storedAppCode);
            if (response.status) {
                onValidCode(response.data); // Navigate to the dashboard
            } else {
                setError(response.message ?? "خطأ غير متوقع!")
            }
        } catch (err) {
            setError("خطأ غير متوقع!");
        } finally {
            setLoading(false);
        }
    };

    const clearStorage = () => {
        localStorage.clear();
        setAppCode(null);
        const newAppCode = generateRandomString();
        localStorage.setItem('appCode', newAppCode);
        setRandomString(newAppCode);
        setError(null);
        setLoading(false);
    };

    return {
        appCode,
        loading,
        randomString,
        error,
        handleChecking,
        clearStorage, // Expose the function to clear storage
    };
};
