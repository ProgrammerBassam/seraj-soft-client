import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CardAlert() {
    return (
        <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
            <CardContent>
                <AutoAwesomeRoundedIcon fontSize="small" />
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    إحصل على الخصومات
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  يمكنك الحصول على خصومات تصل إلى ٥٠٪ عند الإشتراك بأكثر من خدمة
                </Typography>
                <Button variant="contained" size="small" fullWidth>
                   تواصل معنا
                </Button>
            </CardContent>
        </Card>
    );
}