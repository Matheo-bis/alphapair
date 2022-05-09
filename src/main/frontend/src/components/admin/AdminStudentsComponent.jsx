import React, { Component } from 'react';
import withRouter from '../Router';

class AdminStudentsComponent extends Component {

    render() {
        return (
            <div>
                Admin list of all students on the app
            </div>
        );
    }
}

export default withRouter(AdminStudentsComponent);