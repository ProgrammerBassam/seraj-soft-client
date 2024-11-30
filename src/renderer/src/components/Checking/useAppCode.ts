import { useEffect, useState } from 'react';
import { validateAppCode } from '../../api/appCodeApi';
import { generateRandomString } from './helpers';

// Custom Hook for App Code Logic
export const useAppCode = (onValidCode: () => void) => {
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
            setRandomString(generateRandomString());
        }
    }, []);

    const validateExistingAppCode = async (code: string) => {
        setLoading(true);
        try {
            const response = await validateAppCode(code);
            if (response.status) {
                onValidCode(); // Navigate to the dashboard
            } else {
                setError(response.message ?? "خطأ غير متوقع!")
            }
        } catch (err) {
            setError('Invalid app code. Please generate a new one.');
            localStorage.removeItem('appCode');
            setRandomString(generateRandomString());
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAppCode = async () => {
        setLoading(true);
        const newAppCode = generateRandomString();
        try {
            const response = await validateAppCode(newAppCode);
            if (response.status) {
                localStorage.setItem('appCode', newAppCode);
                onValidCode(); // Navigate to the dashboard
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
        setRandomString(generateRandomString());
        setError(null);
        setLoading(false);
    };

    return {
        appCode,
        loading,
        randomString,
        error,
        handleGenerateAppCode,
        clearStorage, // Expose the function to clear storage
    };
};
