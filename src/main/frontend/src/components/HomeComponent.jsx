import React, { Component } from 'react';
import axios from 'axios';
import withRouter from './Router';
import UserService from '../services/UserService';



class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/v1/content")
        .then((res) => {
            this.setState({
                content: res.data
            });
        }).catch((err) => {
            if (err.response) {
                if (err.response.status == 401) {
                    this.props.history('/login');
                }
            }
        })
        /*.then((res) => {
            if (res.data === "") {
                this.props.history('/login');
            } else {
                this.setState({
                    content: res.data
                });
            }
        });*/
    }

    handleLogout = () => {
        UserService.userLogout(this.props.history);
    }

    render() {
        return (
            <div>
                {this.state.content}
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default withRouter(HomeComponent);