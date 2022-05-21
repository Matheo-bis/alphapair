import { Groups, School } from '@mui/icons-material';
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBarComponent from '../NavBarComponent';
import styles from '../../styles/style';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(styles);

const menu = [
    {
        name: "Classes",
        icon: School,
        to: "/home"
    },
    {
        name: "Étudiants",
        icon: Groups,
        to: "/students"
    }
]

const isPathName = (string) => {
    return window.location.pathname === string;
}

const AdminHeaderComponent = (props) => {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline/>
            <NavBarComponent user={props.user}/>
            <Drawer
                variant="permanent"
                sx={{
                width: 250,
                backgroundColor:"blue",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' }
                }}
            >
                <Toolbar/>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {
                            menu.map((item) => {
                                let IconComponent = item.icon;
                                return (
                                    <ListItem className={classes.menu_item} button key={item.to} selected={isPathName(item.to)} component={Link} to={item.to}>
                                        <ListItemIcon><IconComponent/></ListItemIcon>
                                        <ListItemText disableTypography primary={
                                            <Typography style={{fontFamily: "dm-700", fontSize: 20}}>{item.name}</Typography>
                                        }/>
                                    </ListItem>
                                )
                        })}
                    </List>
                    <Divider/>
                </Box>
            </Drawer>
        </div>
    )
}

export default AdminHeaderComponent;