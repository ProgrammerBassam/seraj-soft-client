import React from 'react';
import { Box, Typography, Alert, Paper, Divider, Avatar, Stack, Chip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import ApiIcon from '@mui/icons-material/Api';
import { useServiceStatus } from './useServiceStatus';
import { useWhatsAppStatus } from './useWhatsAppStatus'; // Custom hook for WhatsApp status

export function Home() {
    const smsStatus = useServiceStatus('smsEndDate');
    const whatsappServiceStatus = useServiceStatus('whatsappEndDate');
    const apiStatus = useServiceStatus('apiEndDate');
    const { isConnected } = useWhatsAppStatus(); // WhatsApp connection status

    const renderStatusChip = (status: boolean) => (
        <Chip
            label={status ? 'متاح' : 'غير متاح'}
            variant="outlined"
            color={status ? 'success' : 'error'}
        />
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 4,
                minHeight: '100vh',
                backgroundColor: '#f9fafc',
            }}
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
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 600,
                    width: '100%',
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        marginBottom: 3,
                        fontWeight: 'bold',
                        color: 'primary.main',
                    }}
                >
                    خدمات المستخدم
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />

                {/* SMS Section */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <SmsIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2, textAlign: 'right' }}>
                        <Typography variant="body1">
                            <strong>الرسائل النصية:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {smsStatus.endDate || 'غير متوفر'}
                        </Typography>
                        {smsStatus.remainingDays !== null ? (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {smsStatus.remainingDays} يوم
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}
                    </Box>
                    {renderStatusChip(smsStatus.isActive)}
                </Stack>

                <Divider sx={{ marginBottom: 2 }} />

                {/* WhatsApp Service Section */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                    <Avatar sx={{ bgcolor: 'success.main', color: 'white' }}>
                        <WhatsAppIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2, textAlign: 'right' }}>
                        <Typography variant="body1">
                            <strong>استخدام واتساب:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {whatsappServiceStatus.endDate || 'غير متوفر'}
                        </Typography>
                        {whatsappServiceStatus.remainingDays !== null ? (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {whatsappServiceStatus.remainingDays} يوم
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}

                        {/* WhatsApp Connection Status */}
                        <Typography
                            variant="body2"
                            sx={{ marginTop: 1, fontWeight: 'bold', color: isConnected ? 'success.main' : 'error.main' }}
                        >
                            حالة الاتصال: {isConnected ? 'متصل' : 'غير متصل'}
                        </Typography>
                    </Box>
                    {renderStatusChip(whatsappServiceStatus.isActive)}
                </Stack>

                <Divider sx={{ marginBottom: 2 }} />

                {/* API Section */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                    <Avatar sx={{ bgcolor: 'info.main', color: 'white' }}>
                        <ApiIcon />
                    </Avatar>
                    <Box sx={{ flex: 1, pr: 2, textAlign: 'right' }}>
                        <Typography variant="body1">
                            <strong>تصفح البيانات من التطبيق:</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            تاريخ الانتهاء: {apiStatus.endDate || 'غير متوفر'}
                        </Typography>
                        {apiStatus.remainingDays !== null ? (
                            <Typography variant="body2" color="success.main">
                                الأيام المتبقية: {apiStatus.remainingDays} يوم
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="error.main">
                                الخدمة منتهية
                            </Typography>
                        )}
                    </Box>
                    {renderStatusChip(apiStatus.isActive)}
                </Stack>
            </Paper>
        </Box>
    );
}
