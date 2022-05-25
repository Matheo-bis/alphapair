import { Groups, Help, Info, School } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../styles/style';
import NavBarComponent from '../NavBarComponent';


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

const bottomMenu = [
    {
        name: "Paramètres",
        icon: SettingsIcon,
        to: ""
    },
    {
        name: "Aide",
        icon: Help,
        to: ""
        
    },
    {
        name: "À propos",
        icon: Info,
        to: ""
        
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
                <Box sx={{ overflow: 'auto'}} >
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
                    <div style={{width: '100%', bottom: 0, position: 'absolute'}}>
                        <Divider/>
                        <List >
                            {
                                bottomMenu.map((item) => {
                                    let IconComponent = item.icon;
                                    return (
                                        <ListItem className={classes.menu_item} button key={item.name} selected={isPathName(item.to)} component={Link} to={item.to}>
                                            <ListItemIcon><IconComponent/></ListItemIcon>
                                            <ListItemText disableTypography primary={
                                                <Typography style={{fontFamily: "dm-700", fontSize: 20}}>{item.name}</Typography>
                                            }/>
                                        </ListItem>
                                    )
                            })}
                        </List>
                    </div>
                    
                </Box>
            </Drawer>
        </div>
    )
}

export default AdminHeaderComponent;