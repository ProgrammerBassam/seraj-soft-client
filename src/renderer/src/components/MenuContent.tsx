import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DraftsIcon from '@mui/icons-material/Drafts';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { WhatsApp } from '@mui/icons-material';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

const mainListItems = [
    { text: 'الرئيسية', icon: <HomeRoundedIcon /> },
    { text: 'خدمة الرسائل', icon: <MailOutlineIcon />, hasSublist: true },
    { text: 'المستخدمين (قريباً)', icon: <PeopleRoundedIcon /> },
    { text: 'المبيعات (قريباً)', icon: <AssignmentRoundedIcon /> },
];

const sublistItems = [
    { text: 'واتساب', icon: <WhatsApp /> },
    { text: 'الرسائل النصية', icon: <DraftsIcon /> },
];

const secondaryListItems = [
    { text: 'الإعدادات', icon: <SettingsRoundedIcon /> },
    { text: 'من نحن', icon: <InfoRoundedIcon /> },
    { text: 'هل لديك إقتراح؟', icon: <HelpRoundedIcon /> },
];



export default function MenuContent() {
    const [openSublist, setOpenSublist] = useState(false);

    const handleToggleSublist = () => {
        setOpenSublist((prevOpen) => !prevOpen);
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={item.hasSublist ? handleToggleSublist : undefined} selected={index === 0}>
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
                                            <ListItemButton sx={{ pl: 4 }}>
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
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ textAlign: 'right' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
