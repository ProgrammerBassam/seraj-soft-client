import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import packageInfo from '../../../../../package.json';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import appIcon from './app_icon.png'; // Adjust path if necessary
import { useAppCode } from './useAppCode';


export function Checking() {
    const navigate = useNavigate();

    const { loading, randomString, error, handleGenerateAppCode, clearStorage } = useAppCode(() => {
        navigate('/dashboard');
    });

    if (loading) {
        return <LoadingSpinner message={error || 'فحص البيانات...'} />;
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
        textAlign: 'right', // Align text to the left for better readability
    })}
>
    {/* Company Logo */}
    <Box
        component="img"
        src={appIcon}
        
        sx={(theme: Theme) => ({
            width: 90,
            height: 90,
         
            marginLeft: theme.spacing(3), // Add spacing between logo and text
           
            borderRadius: '50%',
            boxShadow: `0px 4px 12px ${theme.palette.grey[300]}`,
        })}
    />

    {/* Company Information */}
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

            {/* QR Code Section */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 500, color: error ? (theme: Theme) => theme.palette.error.main : (theme: Theme) => theme.palette.text.secondary }}
                >
                    {error ? 'خطأ' : 'الرجاء مسح الكود لتسجيل البيانات'}
                </Typography>
                <Paper
                    elevation={4}
                    sx={{
                        padding: (theme: Theme) => theme.spacing(3),
                        borderRadius: 4,
                        marginTop:  (theme: Theme) => theme.spacing(1),
                        textAlign: 'center',
                        display: 'inline-block',
                        boxShadow: (theme: Theme) => `0px 6px 14px ${theme.palette.grey[300]}`,
                        backgroundColor: (theme: Theme) => theme.palette.background.paper,
                    }}
                >
                    <QRCodeSVG value={randomString || 'default'} size={200} />
                    <Typography variant="body1" sx={{ marginTop: (theme: Theme) => theme.spacing(2), fontWeight: 500 }}>
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
                        onClick={handleGenerateAppCode}
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
