import { useEffect, useState } from 'react';
import { validateAppCode } from '../../api/appCodeApi';


// Custom Hook for App Code Logic
export const useBlock = (onValidCode: (data) => void) => {
    const [whyBlocked, setWhyBlocked] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Check and validate the app code on mount
    useEffect(() => {
        setWhyBlocked(localStorage.getItem("whyBlocked"))

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
        } finally {
            setLoading(false);
        }
    };

    const handleChecking = async () => {
        setError('')
        setLoading(true);
        var storedAppCode = localStorage.getItem('appCode') ?? "";

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



    return {
        whyBlocked,
        loading,
        error,
        handleChecking,
        setWhyBlocked,
    };
};
