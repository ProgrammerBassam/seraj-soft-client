import { Alert, Box, Button, Divider, Paper, Snackbar, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import packageInfo from '../../../../../package.json';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import appIcon from './app_icon.png'; // Adjust path if necessary
import { useAppCode } from './useAppCode';
import React from 'react';

export function Checking() {
    const navigate = useNavigate();

    const { loading, randomString, error, handleChecking, clearStorage } = useAppCode((data) => {
        const canUseSms = data.can_use_sms;
        const smsEndDate = data.sms_end_date;
        // Save
        localStorage.setItem('canUseSms', canUseSms);
        localStorage.setItem('smsEndDate', smsEndDate);

        const canUseWhatsapp = data.can_use_whatsapp;
        const whatsappEndDate = data.whatsapp_end_date;
        // Save
        localStorage.setItem('canUseWhatsapp', canUseWhatsapp);
        localStorage.setItem('whatsappEndDate', whatsappEndDate);

        const canUseApi = data.can_use_api;
        const apiEndDate = data.api_end_date;
        // Save
        localStorage.setItem('canUseApi', canUseApi);
        localStorage.setItem('apiEndDate', apiEndDate);

        const authUsername = data.auth_username;
        const authPassword = data.auth_password;
        // Save
        localStorage.setItem('authUsername', authUsername);
        localStorage.setItem('authPassword', authPassword);

        const documentId = data.document_id;
        const isBlocked = data.is_blocked;
        const whyBlocked = data.why_blocked;
        // Save
        localStorage.setItem('documentId', documentId);
        localStorage.setItem('isBlocked', isBlocked);
        localStorage.setItem('whyBlocked', whyBlocked);

        if (isBlocked) {
            navigate('/blocked');
        } else {
            navigate('/dashboard');
        }
    });

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    React.useEffect(() => {
        if (error) {
            setSnackbarOpen(true);
        }
    }, [error]);

    const handleSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return; // Ignore clickaway dismissals
        setSnackbarOpen(false);
    };

    if (loading) {
        return <LoadingSpinner message="فحص البيانات..." />;
    }

    return (
        <Box
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                padding: theme.spacing(4),
                backgroundColor: theme.palette.grey[100], // Light background
                color: theme.palette.text.primary,
            })}
        >
            {/* Company Logo and Info */}
            <Box
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: theme.spacing(4),
                    textAlign: 'right',
                })}
            >
                <Box
                    component="img"
                    src={appIcon}
                    sx={(theme: Theme) => ({
                        width: 90,
                        height: 90,
                        marginLeft: theme.spacing(3),
                        borderRadius: '50%',
                        boxShadow: `0px 4px 12px ${theme.palette.grey[300]}`,
                    })}
                />
                <Box>
                    <Typography
                        variant="h5"
                        sx={(theme: Theme) => ({
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            marginBottom: theme.spacing(1),
                        })}
                    >
                        شركة سراج سوفت
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={(theme: Theme) => ({
                            color: theme.palette.text.secondary,
                        })}
                    >
                        نظام سراج سوفت المكتبي
                    </Typography>
                </Box>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Automatically hide after 3 seconds
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"

                >
                    {error || 'حدث خطأ ما!'}
                </Alert>
            </Snackbar>

            {/* QR Code Section */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: 500,
                        color: (theme: Theme) => theme.palette.text.secondary,
                        marginTop: (theme: Theme) => theme.spacing(1),
                    }}
                >
                    الرجاء مسح الكود لتسجيل البيانات
                </Typography>
                <Paper
                    elevation={4}
                    sx={{
                        padding: (theme: Theme) => theme.spacing(3),
                        borderRadius: 4,
                        marginTop: (theme: Theme) => theme.spacing(1),
                        textAlign: 'center',
                        display: 'inline-block',
                        boxShadow: (theme: Theme) => `0px 6px 14px ${theme.palette.grey[300]}`,
                        backgroundColor: (theme: Theme) => theme.palette.background.paper,
                    }}
                >
                    <QRCodeSVG value={randomString || 'default'} size={200} />
                    <Typography
                        variant="body1"
                        sx={{
                            marginTop: (theme: Theme) => theme.spacing(2),
                            fontWeight: 500,
                        }}
                    >
                        {randomString}
                    </Typography>
                </Paper>
                <Box sx={{ marginTop: (theme: Theme) => theme.spacing(3) }}>
                    <Button
                        variant="contained"
                        sx={{
                            marginLeft: (theme: Theme) => theme.spacing(1),
                            paddingX: (theme: Theme) => theme.spacing(3),
                        }}
                        onClick={handleChecking}
                        disabled={loading}
                    >
                        إبدأ التحقق
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ paddingX: (theme: Theme) => theme.spacing(3) }}
                        onClick={clearStorage}
                    >
                        إعادة تعيين
                    </Button>
                </Box>
            </Box>

            {/* App Version Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    marginTop: (theme: Theme) => theme.spacing(4),
                }}
            >
                <Divider sx={{ marginBottom: (theme: Theme) => theme.spacing(2) }} />
                <Paper
                    elevation={2}
                    sx={{
                        display: 'inline-block',
                        padding: (theme: Theme) => theme.spacing(1, 2),
                        borderRadius: 8,
                        backgroundColor: (theme: Theme) => theme.palette.primary.dark,
                        color: (theme: Theme) => theme.palette.primary.contrastText,
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        الإصدار {packageInfo.version}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
