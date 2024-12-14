import { WhatsApp } from '@mui/icons-material';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
    { text: 'الرئيسية', icon: <HomeRoundedIcon />, disabled: false, page: '/dashboard' },
    { text: 'خدمة الرسائل', icon: <MailOutlineIcon />, hasSublist: true, disabled: false },
    { text: 'المستخدمين', icon: <PeopleRoundedIcon />, disabled: false, page: '/dashboard/users' },
    { text: 'المبيعات (قريباً)', icon: <AssignmentRoundedIcon />, disabled: true },
];

const sublistItems = [
    { text: 'واتساب', icon: <WhatsApp />, disabled: false, page: '/dashboard/messages/whatsapp' },
    { text: 'الرسائل النصية', icon: <DraftsIcon />, disabled: false, page: '/dashboard/messages/sms' },
    { text: 'التقارير', icon: <AnalyticsRoundedIcon />, disabled: true, page: '/dashboard/messages/reports' },
];

const secondaryListItems = [
    { text: 'الإعدادات', icon: <SettingsRoundedIcon />, page: '/settings' },
    { text: 'من نحن', icon: <InfoRoundedIcon />, page: '/about' },
    { text: 'هل لديك إقتراح؟', icon: <HelpRoundedIcon />, page: '/suggestions' },
];

export default function MenuContent() {
    const [openSublist, setOpenSublist] = useState(false);
    const [selectedPage, setSelectedPage] = useState('/dashboard'); // Track selected page
    const navigate = useNavigate();

    const handleToggleSublist = () => {
        setOpenSublist((prevOpen) => !prevOpen);
    };

    const handleNavigate = (page) => {
        if (page) {
            setSelectedPage(page); // Update selected page
            navigate(page); // Navigate to the page
        }
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={
                                    item.hasSublist ? handleToggleSublist : () => handleNavigate(item.page)
                                }
                                selected={selectedPage === item.page} // Highlight if selected
                                disabled={item.disabled}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ textAlign: 'right' }} />
                                {item.hasSublist && (openSublist ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>
                        </ListItem>
                        {item.hasSublist && (
                            <Collapse in={openSublist} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {sublistItems.map((subItem, subIndex) => (
                                        <ListItem key={subIndex} disablePadding>
                                            <ListItemButton
                                                sx={{ pl: 4 }}
                                                onClick={() => handleNavigate(subItem.page)}
                                                selected={selectedPage === subItem.page} // Highlight if selected
                                                disabled={subItem.disabled}
                                            >
                                                <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                <ListItemText primary={subItem.text} sx={{ textAlign: 'right' }} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => handleNavigate(item.page)}
                            selected={selectedPage === item.page} // Highlight if selected
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ textAlign: 'right' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}