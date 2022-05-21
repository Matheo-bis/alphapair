import { FormatListNumbered, Group, JoinInner, Subject } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBarComponent from '../NavBarComponent';

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
        icon: Group,
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

    isPathName(string) {
        return window.location.pathname === string;
    }

    render() {
        return (
            <div>
                <CssBaseline/>
                <NavBarComponent user={this.state.user}/>
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