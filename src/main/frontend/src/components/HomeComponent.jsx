import React, { Component } from 'react';
import axios from 'axios';
import withRouter from './Router';



class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/v1/content").then((res) => {
            if (res.data === "") {
                this.props.history('/login');
            } else {
                this.setState({
                    content: res.data
                });
            }
        });
    }

    handleLogout = () => {
        axios.get("http://localhost:8080/api/v1/logout").then((res) => {
            this.props.history('/login');
        });
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