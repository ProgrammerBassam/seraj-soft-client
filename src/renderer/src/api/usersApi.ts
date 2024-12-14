import { STATIC_URLS } from '../utils/static_urls';


export const getUsersApi = async (appCode: string): Promise<{ status: string }> => {
    const endpoint = `${STATIC_URLS.BASE_ADMIN_URL}${STATIC_URLS.GET_USERS}`; // Construct the full URL

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
            throw new Error(errorData.message || 'فشل لجلب بيانات المستخدمين@');
        }

        // Parse the JSON response
        const data = await response.json();

        return { status: data.data.status, message: data.data.message, users: data.data.users }; // Return the status from the response
    } catch (error) {
        // Handle errors
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred.');
    }
};

export const deleteUserApi = async (id: string) => {
    // Simulating an API call
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({ status: true });
        }, 1000)
    );
};

export const updateUserSmsApi = async (appCode: string, id: string) => {
    const endpoint = `${STATIC_URLS.BASE_ADMIN_URL}${STATIC_URLS.UPDATE_USER_SMS_MAIN}`; // Construct the full URL

    try {
        // Perform the POST request with fetch
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON content
                'Accept': 'application/json', // Specify JSON content
            },
            body: JSON.stringify({ code: appCode, userId: id }), // Send the appCode in the body
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.message || 'لم نتمكن من التعديل حالياً');
        }

        // Parse the JSON response
        const data = await response.json();

        return { status: data.data.status, message: data.data.message }; // Return the status from the response
    } catch (error) {
        // Handle errors
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred.');
    }
};