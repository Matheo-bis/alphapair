import { Box, Toolbar } from '@mui/material';
import React, { Component } from 'react';
import UserService from '../services/UserService';
import BufferComponent from './BufferComponent';
import HeaderComponent from './HeaderComponent';
import withRouter from './Router';

class RoleFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rightRole: null
        }
    }

    componentDidMount() {
        if (this.props.adminRequired !== null) {
            UserService.userIsAdmin(
                null,
                (res) => this.setState({
                    rightRole: res === this.props.adminRequired
                })
            );
        } else {
            this.setState({
                rightRole: true
            })
        }
        
    }

    render() {
        if (this.state.rightRole != null) {
            if (this.state.rightRole) {
                const Component = this.props.component;
                return (
                    <div>
                        <Box style={{backgroundColor: "#fafbfb"}} sx={{ display: 'flex' }}>
                            <HeaderComponent/>
                            <Box component="main" style={{padding: 0}} sx={{ flexGrow: 1, p: 3, paddingTop: 1.5, paddingLeft: 2 }}>
                                <Toolbar/>
                                <div className="container" style={{width: "100%", padding: "15px 20px 15px 20px",  margin: 0, overflowY: "auto", height: "calc(100vh - 64px)"}}>
                                    <Component params={this.props.params}/>
                                </div>
                            </Box>
                        </Box>
                        
                    </div>
                );
            } else {
                window.location = "/home";
            }
                
        } else {
            return <BufferComponent/>
        }
    }
}

export default withRouter(RoleFilter);