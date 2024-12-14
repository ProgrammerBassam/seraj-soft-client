import { useEffect, useState } from "react";
import { getUsersApi, deleteUserApi, updateUserSmsApi } from "../../api/usersApi";

export const useSms = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch users on mount
    useEffect(() => {
        const storedAppCode = localStorage.getItem("appCode");
        if (storedAppCode) {
            getUsers(storedAppCode);
        }
    }, []);

    const getUsers = async (code: string) => {
        setError(null);
        setLoading(true);
        try {
            const response = await getUsersApi(code);
            if (response.status) {
                setUsers(response.users ?? []); // Fetch users from the response
            } else {
                setError(response.message ?? "خطأ غير متوقع!");
            }
        } catch (err) {
            setError("خطأ غير متوقع!");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        setLoading(true);
        try {
            const response = await deleteUserApi(id);
            if (response.status) {
                setUsers((prev) => prev.filter((user) => user.id !== id));
            } else {
                setError(response.message ?? "لم يتم الحذف!");
            }
        } catch (err) {
            setError("خطأ أثناء محاولة الحذف!");
        } finally {
            setLoading(false);
        }
    };

    const updateAsMainNumber = async (id: string) => {
        setLoading(true);
        try {
            const storedAppCode = localStorage.getItem("appCode");
            if (storedAppCode) {
                const response = await updateUserSmsApi(storedAppCode, id);
                if (response.status) {
                    setUsers((prev) =>
                        prev.map((user) =>
                            user.id === id ? { ...user, is_main: true } : { ...user, is_main: false }
                        )
                    );
                } else {
                    setError(response.message ?? "لم يتم التحديث!");
                }
            }

        } catch (err) {
            setError("خطأ أثناء محاولة التحديث!");
        } finally {
            setLoading(false);
        }
    };

    const reload = () => {
        const storedAppCode = localStorage.getItem("appCode");
        if (storedAppCode) {
            getUsers(storedAppCode);
        }
    };

    return {
        users,
        loading,
        error,
        reload,
        deleteUser,
        updateAsMainNumber,
    };
};
