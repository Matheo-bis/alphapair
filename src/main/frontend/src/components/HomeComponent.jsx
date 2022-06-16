import React, { Component } from 'react';
import UserService from '../services/UserService';
import AdminHomeComponent from './admin/AdminHomeComponent';
import BufferComponent from './BufferComponent';
import withRouter from './Router';
import StudentHomeComponent from './student/StudentHomeComponent';
import StudentJoinComponent from './student/StudentJoinComponent';

class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        UserService.userGetSelf(
            null,
            (res) => this.setState({user: res})
        );
    }

    render() {
        if (this.state.user != null) {
            if (this.state.user.isAdmin)
                return <AdminHomeComponent/>
            else if (this.state.user.promotionId != ""){
                return <StudentHomeComponent/>
            } else {
                return <StudentJoinComponent/>
            }
                
        } else
            return <BufferComponent/>
    }
}

export default withRouter(HomeComponent);