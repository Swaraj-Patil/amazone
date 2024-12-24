import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { setSidebarState } from '../../redux/actions/adminActions';
import { AddCircle, Dashboard, Inbox, ListAltRounded, Reviews, ShoppingCart, VerifiedUserSharp } from '@mui/icons-material';

export default function Sidebar() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const handleLinkClick = link => {
        dispatch(setSidebarState(link))
    }

    const iconMapping = {
        'Dashboard': <Dashboard />,
        'All Products': <ShoppingCart />,
        'Create a Product': <AddCircle />,
        'Orders': <ListAltRounded />,
        'Users': <VerifiedUserSharp />,
        'Reviews': <Reviews />,
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Dashboard', 'All Products', 'Create a Product'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleLinkClick(text)}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Orders', 'Users', 'Reviews'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
