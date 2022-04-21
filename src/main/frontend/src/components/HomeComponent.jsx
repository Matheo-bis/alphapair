import React, { Component } from 'react';
import withRouter from './Router';
import UserService from '../services/UserService';
import ContentService from '../services/ContentService'; 

class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: "default"
        }
    }

    componentDidMount() {
        ContentService.getContent(
            (res) => this.setState({content: res})
        );
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