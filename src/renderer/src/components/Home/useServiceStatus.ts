import { useMemo } from 'react';
import dayjs from 'dayjs';

interface ServiceStatus {
    endDate: string | null;
    isActive: boolean;
    remainingDays: number | null;
}

export const useServiceStatus = (serviceKey: string): ServiceStatus => {
    const endDate = localStorage.getItem(serviceKey);

    const today = dayjs();
    const targetDate = endDate ? dayjs(endDate) : null;

    const isActive = useMemo(() => targetDate?.isAfter(today) ?? false, [targetDate, today]);
    const remainingDays = useMemo(() => {
        if (!targetDate) return null;
        const diff = targetDate.diff(today, 'day');
        return diff >= 0 ? diff : null;
    }, [targetDate, today]);

    return {
        endDate,
        isActive,
        remainingDays,
    };
};
