import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

export default function NavbarBreadcrumbs() {
    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateBeforeRoundedIcon fontSize="small" />}
        >
            <Typography variant="body1">لوحة التحكم</Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                الرئيسية
            </Typography>
        </StyledBreadcrumbs>
    );
}