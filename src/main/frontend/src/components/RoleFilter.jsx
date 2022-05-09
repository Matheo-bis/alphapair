import { Box, Toolbar } from '@mui/material';
import React, { Component } from 'react';
import UserService from '../services/UserService';
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
                        <Box sx={{ display: 'flex' }}>
                            <HeaderComponent/>
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <Toolbar/>
                                <div className="container">
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
            return <div>loading...</div>;
        }
    }
}

export default withRouter(RoleFilter);