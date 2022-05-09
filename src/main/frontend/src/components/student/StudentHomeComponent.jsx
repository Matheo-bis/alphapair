import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import withRouter from '../Router';

class StudentHomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasProm: false
        }
    }

    componentDidMount() {
        UserService.userIsStudentPromless(
            null,
            (res) => {
                if (res) { // in case the student does not have a promotion
                    window.location = "/join";
                } else {
                    this.setState({
                        hasProm: true
                    })
                }
            }
        );
    }

    render() {
        if (this.state.hasProm) {
            return (
                <div>
                    Student home component.
                </div>
                
            );
        } else {
            return <div>loading...</div>;
        }
        
    }
}

export default withRouter(StudentHomeComponent);