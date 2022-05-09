import React, { Component } from 'react';
import withRouter from '../Router';

class StudentChoicesComponent extends Component {

    render() {
        return (
            <div>
                Student choices component.
            </div>
        );
    }
}

export default withRouter(StudentChoicesComponent);