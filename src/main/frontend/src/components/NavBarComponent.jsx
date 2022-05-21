import { DarkMode, Logout, Settings } from '@mui/icons-material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { AppBar, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Component } from 'react';
import UserService from '../services/UserService';
import alphapair_white from "../assets/alphapair_white.svg"

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
        return (
            <AppBar style={{backgroundColor: "#5865F2", position: "fixed", overflow: "hidden", userSelect: "none"}} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <img src={alphapair_white} style={{height: "30px", marginRight: 10}}/>

                    <Typography variant="h6" noWrap component="div" style={{fontFamily: "dm-700", fontSize: 25}}>
                        {"alphapair"}
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
        );
    }
}

export default NavBarComponent;