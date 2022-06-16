import { DarkMode, Logout, Settings } from '@mui/icons-material';
import { AppBar, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Component } from 'react';
import alphapair_white from "../assets/alphapair_white.svg";
import UserService from '../services/UserService';
import { getAvatarColorFromName } from '../styles/style';

class NavBarComponent extends Component {

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

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
    };

    
    render() {
        
        const anchorEl = this.state.anchorEl;
        if (this.props.user !== null)
            return (
                <AppBar style={{backgroundColor: "#5865F2", position: "fixed", overflow: "hidden", userSelect: "none"}} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <img alt="alphapair icon" src={alphapair_white} style={{height: "30px", marginRight: 10}}/>

                        <Typography variant="h6" noWrap component="div" style={{fontFamily: "dm-700", fontSize: 25}}>
                            {"alphapair"}
                        </Typography>
                        <span style={{margin: "auto"}}></span>
                        <Tooltip title="Mon compte">
                            <IconButton
                                onClick={this.handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                                style={{marginLeft: "0"}}
                            >
                            <Avatar 
                                sx={{ bgcolor: getAvatarColorFromName(this.state.user.firstName)}}
                                style={{fontFamily: "dm-400"}}
                            >
                                {(this.state.user.firstName[0] + this.state.user.lastName[0]).toUpperCase()}
                            </Avatar>
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
                                <Stack direction="column" style={{margin: "auto"}}>
                                    <Avatar 
                                        sx={{ bgcolor: getAvatarColorFromName(this.state.user.firstName)}}
                                        style={{fontFamily: "dm-400", width: "56px", height: "56px", margin: "auto"}}
                                    >
                                        {(this.state.user.firstName[0] + this.state.user.lastName[0]).toUpperCase()}
                                    </Avatar>

                                    <span style={{marginTop: 5, fontFamily: "dm-700"}}>{this.state.user.firstName} {this.state.user.lastName}</span>
                                </Stack>
                                
                            </MenuItem>
                            <Divider />
                            <MenuItem style={{"height": "50px"}}>
                                <ListItemIcon>
                                    <DarkMode fontSize="small" />
                                </ListItemIcon>
                                <span style={{fontFamily: "dm-400"}}>Thème sombre</span>
                                <Switch/>
                            </MenuItem>
                            <MenuItem style={{"height": "50px"}}>
                                <ListItemIcon>
                                <Settings fontSize="small" />
                                </ListItemIcon>
                                <span style={{fontFamily: "dm-400"}}>Paramètres du compte</span>
                            </MenuItem>
                            <MenuItem style={{"height": "50px"}} onClick={this.handleLogout}>
                                <ListItemIcon>
                                <Logout fontSize="small" />
                                </ListItemIcon>
                                <span style={{fontFamily: "dm-400"}}>Se déconnecter</span>
                            </MenuItem>
                        </Menu>
                        
                    </Toolbar>
                </AppBar>
            );
        else
            return (
                <AppBar style={{backgroundColor: "#5865F2", position: "fixed", overflow: "hidden", userSelect: "none"}} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <img alt="alphapair icon" src={alphapair_white} style={{height: "30px", marginRight: 10}}/>

                        <Typography variant="h6" noWrap component="div" style={{fontFamily: "dm-700", fontSize: 25}}>
                            {"alphapair"}
                        </Typography>
                    </Toolbar>
                </AppBar>
            );
    }
}

export default NavBarComponent;