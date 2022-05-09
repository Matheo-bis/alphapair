import React, { Component } from 'react';
import UserService from '../services/UserService';
import AdminHomeComponent from './admin/AdminHomeComponent';
import BufferComponent from './BufferComponent';
import withRouter from './Router';
import StudentHomeComponent from './student/StudentHomeComponent';

class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: null
        }
    }

    componentDidMount() {
        UserService.userIsAdmin(
            null,
            (res) => this.setState({isAdmin: res})
        );
    }

    render() {
        if (this.state.isAdmin != null) {
            if (this.state.isAdmin)
                return <AdminHomeComponent/>
            else
                return <StudentHomeComponent/>
        } else
            return <BufferComponent/>
    }
}

export default withRouter(HomeComponent);