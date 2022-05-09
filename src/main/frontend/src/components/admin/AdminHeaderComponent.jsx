import React, { Component } from 'react';
import UserService from '../../services/UserService';

class AdminHeaderComponent extends Component {
    
    handleLogout = () => {
        UserService.userLogout();
    }

    render() {
        return (
            <div>
                Admin header : {this.props.user.mail}
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default AdminHeaderComponent;