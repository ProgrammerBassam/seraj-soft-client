import React from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Button, Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QRCodeSVG } from 'qrcode.react';
import { useWhatsApp } from './useWhatsApp';

export function WhatsApp() {
    const { qrCode, status, userInfo } = useWhatsApp();

    const handleReconnect = () => {
        console.log('Reconnecting to WhatsApp...');
        window.context?.reconnect?.(); // Trigger reconnection
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',

            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold', marginBottom: 4 }}
            >
                حالة الربط مع الواتساب
            </Typography>

            {status === 'connecting' && !qrCode && (
                <Box>
                    <CircularProgress color="primary" />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        جاري الاتصال بالواتساب...
                    </Typography>
                </Box>
            )}

            {qrCode && status !== 'connected' && (
                <Paper
                    elevation={4}
                    sx={{
                        padding: 3,
                        textAlign: 'center',
                        borderRadius: '12px',
                    }}
                >
                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ fontWeight: 'bold', }}
                    >
                        الرجاء مسح رمز QR للاتصال:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            padding: 2,
                            borderRadius: '12px',
                        }}
                    >
                        <QRCodeSVG value={qrCode} size={200} />
                    </Box>
                </Paper>
            )}

            {status === 'connected' && userInfo && (
                <Paper
                    elevation={4}
                    sx={(theme) => ({
                        padding: 4,
                        textAlign: 'center',
                        backgroundColor: theme.palette.success[900],
                        borderRadius: '12px',
                        color: theme.palette.success.main,
                    })}
                >
                    <CheckCircleIcon sx={{ fontSize: 50, color: '#28a745', marginBottom: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        متصل بنجاح
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        {userInfo.profilePicture && (
                            <Avatar
                                src={userInfo.profilePicture}
                                alt={userInfo.name}
                                sx={{ width: 64, height: 64 }}
                            />
                        )}
                        <Box sx={{ pr: 2, textAlign: 'right' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: (theme) => theme.palette.text.primary }}>
                                {userInfo.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.primary }}>
                                {userInfo.phone}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            )}

            {status === 'disconnected' && (
                <Alert
                    severity="error"
                    sx={{
                        marginTop: 3,
                        padding: 2,
                        borderRadius: '12px',
                        maxWidth: '400px',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        تم فقد الاتصال بالواتساب.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        الرجاء المحاولة مرة أخرى.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleReconnect}>
                        إعادة المحاولة
                    </Button>
                </Alert>
            )}
        </Box>
    );
}
