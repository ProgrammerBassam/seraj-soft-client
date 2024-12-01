import React from 'react';
import { Box, Typography, Alert, Paper, Divider, Avatar, Stack, Chip } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ApiIcon from '@mui/icons-material/Api';
import dayjs from 'dayjs';

export function Home() {
    // Helper functions
    const calculateRemainingDays = (endDate: string | null) => {
        if (!endDate) return null;

        const today = dayjs();
        const targetDate = dayjs(endDate);
        const diff = targetDate.diff(today, 'day');

        return diff >= 0 ? diff : null; // Return days remaining, or null if expired
    };

    const isServiceActive = (endDate: string | null) => {
        const today = dayjs();
        const targetDate = dayjs(endDate);
        return targetDate.isAfter(today);
    };

    // Retrieve and process values from localStorage
    const smsEndDate = localStorage.getItem('smsEndDate');
    const whatsappEndDate = localStorage.getItem('whatsappEndDate');
    const apiEndDate = localStorage.getItem('apiEndDate');



    const canUseSms = isServiceActive(smsEndDate);
    const remainingSmsDays = calculateRemainingDays(smsEndDate);

    const canUseWhatsapp = isServiceActive(whatsappEndDate);
    const remainingWhatsappDays = calculateRemainingDays(whatsappEndDate);

    const canUseApi = isServiceActive(apiEndDate);
    const remainingApiDays = calculateRemainingDays(apiEndDate);

    // Helper to render status chips
    const renderStatusChip = (status: boolean) => (
        <Chip
            label={status ? 'متاح' : 'غير متاح'}
            sx={(theme) => ({
                color: status ? theme.palette.success.dark : theme.palette.error.dark,
                backgroundColor: status ? theme.palette.success.light : theme.palette.error.light,
                fontWeight: 'bold',
            })}

        />
    );

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: theme.spacing(4),
                minHeight: '100vh',
            })}
        >
            {/* Page Description */}
            <Alert
                variant="outlined"
                severity="info"
                sx={{
                    marginBottom: 4,
                    width: '100%',
                    maxWidth: 600,
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    تحتوي هذه الصفحة على تفاصيل حول بيانات المستخدم وحالة الخدمات.
                </Typography>
            </Alert>

            {/* User Data Display */}
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 600,
                    width: '100%',
                }}
            >
                {/* Header */}
                <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        بيانات المستخدم والخدمات
                    </Typography>
                </Box>

                <Divider sx={{ marginBottom: 2 }} />

                {/* SMS Section */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: 3 }}
                >
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <SmsIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography variant="body1">
                            <strong>الرسائل النصية:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {smsEndDate || 'غير متوفر'}
                        </Typography>
                        {remainingSmsDays !== null && (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {remainingSmsDays} يوم
                            </Typography>
                        )}
                        {remainingSmsDays === null && (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}
                    </Box>
                    {renderStatusChip(canUseSms)}
                </Stack>

                <Divider sx={{ marginBottom: 2 }} />

                {/* WhatsApp Section */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: 3 }}
                >
                    <Avatar sx={{ bgcolor: 'success.main', color: 'white' }}>
                        <WhatsAppIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography variant="body1">
                            <strong>استخدام واتساب:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {whatsappEndDate || 'غير متوفر'}
                        </Typography>
                        {remainingWhatsappDays !== null && (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {remainingWhatsappDays} يوم
                            </Typography>
                        )}
                        {remainingWhatsappDays === null && (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}
                    </Box>
                    {renderStatusChip(canUseWhatsapp)}
                </Stack>

                <Divider sx={{ marginBottom: 2 }} />

                {/* API Section */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: 3 }}
                >
                    <Avatar sx={{ bgcolor: 'info.main', color: 'white' }}>
                        <ApiIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography variant="body1">
                            <strong>واجهة برمجة التطبيقات (API):</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {apiEndDate || 'غير متوفر'}
                        </Typography>
                        {remainingApiDays !== null && (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {remainingApiDays} يوم
                            </Typography>
                        )}
                        {remainingApiDays === null && (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}
                    </Box>
                    {renderStatusChip(canUseApi)}
                </Stack>
            </Paper>
        </Box >
    );
}
