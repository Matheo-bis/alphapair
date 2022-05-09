import { DarkMode, FormatListNumbered, Groups, JoinInner, Logout, Settings, Subject } from '@mui/icons-material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';

const menu = [
    {
        name: "Accueil",
        icon: HomeIcon,
        to: "/home"
    },
    {
        name: "Sujets",
        icon: Subject,
        to: "/subjects"
    },
    {
        name: "Groupes",
        icon: Groups,
        to: "/groups"
    },
    {
        name: "Choix",
        icon: FormatListNumbered,
        to: "/choices"
    },
    {
        name: "Répartition",
        icon: JoinInner,
        to: "/pairs"
    },
]

class StudentHeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            anchorEl: null
        }
    }

    handleLogout = () => {
        UserService.userLogout();
    }

    isPathName(string) {
        return window.location.pathname === string;
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

    render() {
        const anchorEl = this.state.anchorEl;
        return (
            <div>
                    <CssBaseline/>
                    <AppBar style={{backgroundColor: "blue"}} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar>
                            <FactCheckIcon fontSize="large" style={{fill : "#2E8BC0"}}/>
                            <Typography variant="h6" noWrap component="div">
                                {"AlphaPair"}
                            </Typography>
                            <Tooltip title="Mon compte">
                                <IconButton
                                    onClick={this.handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                                    style={{marginLeft: "auto"}}
                                >
                                <Avatar>M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0
                                    }
                                    }
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                <MenuItem style={{ pointerEvents: 'none' }}>
                                    <Avatar/>
                                    <div>{this.state.user.firstName} {this.state.user.lastName}</div>
                                </MenuItem>
                                <Divider />
                                <MenuItem style={{"height": "50px"}}>
                                    <ListItemIcon>
                                    <DarkMode fontSize="small" />
                                    </ListItemIcon>
                                    Thème sombre
                                    <Switch/>
                                </MenuItem>
                                <MenuItem style={{"height": "50px"}}>
                                    <ListItemIcon>
                                    <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Paramètres du compte
                                </MenuItem>
                                <MenuItem style={{"height": "50px"}} onClick={this.handleLogout}>
                                    <ListItemIcon>
                                    <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Se déconnecter
                                </MenuItem>
                            </Menu>
                            
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        sx={{
                        width: 200,
                        backgroundColor:"blue",
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' }
                        }}
                    >
                        <Toolbar/>
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                {
                                    menu.map((item) => {
                                        let IconComponent = item.icon;
                                        return (
                                            <ListItem button key={item.to} selected={this.isPathName(item.to)} component={Link} to={item.to}>
                                                <ListItemIcon><IconComponent/></ListItemIcon>
                                                <ListItemText primary={item.name}/>
                                            </ListItem>
                                        )
                                })}
                            </List>
                        <Divider/>
                        </Box>
                    </Drawer>
                </div>
        );
    }
}

export default StudentHeaderComponent;