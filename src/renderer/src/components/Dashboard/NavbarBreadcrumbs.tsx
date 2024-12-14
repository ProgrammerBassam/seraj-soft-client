import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: theme.palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

// Mapping of routes to Arabic names
const arabicRouteNames: Record<string, string> = {
    dashboard: 'لوحة التحكم',
    messages: 'خدمة الرسائل',
    whatsapp: 'واتساب',
    sms: 'الرسائل النصية',
    users: 'المستخدمين',
    reports: 'التقارير',
    settings: 'الإعدادات',
    about: 'من نحن',
    suggestions: 'الإقتراحات',
};

export default function NavbarBreadcrumbs() {
    const location = useLocation();

    // Split the pathname into breadcrumb items
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateBeforeRoundedIcon fontSize="small" />}
        >

            {/* Generate Breadcrumbs for Each Path */}
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const arabicName = arabicRouteNames[value] || value; // Fallback to the raw name if not found

                return isLast ? (
                    <Typography
                        key={to}
                        variant="body1"
                        sx={{ color: 'text.primary', fontWeight: 600 }}
                    >
                        {arabicName}
                    </Typography>
                ) : (
                    <Typography
                        key={to}
                        variant="body1"
                        component={RouterLink}
                        to={to}
                        sx={{ textDecoration: 'none', color: 'text.secondary' }}
                    >
                        {arabicName}
                    </Typography>
                );
            })}
        </StyledBreadcrumbs>
    );
}
