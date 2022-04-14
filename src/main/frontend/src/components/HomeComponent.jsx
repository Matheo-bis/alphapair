import React, { Component } from 'react';
import withRouter from './Router';
import UserService from '../services/UserService';
import ContentService from '../services/ContentService'; 
import axios from 'axios';
import Protocol from '../services/Protocol';



class HomeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    componentDidMount() {
        /*this.setState({
            content: ContentService.getContent(this.props.history)
        }, console.log(this.state.content));*/

        axios.get("http://localhost:8080/api/v1/content")
        .then((res) => {
            this.setState({
                content: res.data
            });
        }).catch((err) => {
            if (err.response) {
                if (err.response.data === Protocol.MISSING_TOKEN) {
                    this.props.history("/login");
                } else if (err.response.data === Protocol.INVALID_TOKEN) {
                    this.props.history("/login");
                } else if (err.response.data === Protocol.EXPIRED_TOKEN) {
                    // request new accessToken
                    axios.get("http://localhost:8080/api/v1/getnewtokens")
                    .then(() => {
                        this.componentDidMount();
                    }).catch((err) => {
                        if (err.response) {
                            this.props.history("/login");
                        }
                    })
                    
                }
            }
        });


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