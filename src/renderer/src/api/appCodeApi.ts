import { STATIC_URLS } from '../utils/static_urls';


export const validateAppCode = async (appCode: string): Promise<{ status: string }> => {
    const endpoint = `${STATIC_URLS.BASE_ADMIN_URL}${STATIC_URLS.VALIDATE_APP_CODE}`; // Construct the full URL

    try {
        // Perform the POST request with fetch
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON content
                'Accept': 'application/json', // Specify JSON content
            },
            body: JSON.stringify({ code: appCode }), // Send the appCode in the body
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to validate app code.');
        }

        // Parse the JSON response
        const data = await response.json();

        return { status: data.data.status, message: data.data.message, data: data.data }; // Return the status from the response
    } catch (error) {
        // Handle errors
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred.');
    }
};
