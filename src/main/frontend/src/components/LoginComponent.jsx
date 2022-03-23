import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import withRouter from './Router';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        }
    }

    componentDidMount() {
        UserService.userIsLogged(this.props.history);
    }
    
    handleMailChange = (event) => {
        this.setState({mail: event.target.value});
    }
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            mail: this.state.mail,
            password: this.state.password
        };
        /*axios.post("http://localhost:8080/api/v1/login", user).then((res) => {
            if (res.data === 3) { // REPLY_AUTH_ERROR
                this.props.history('/home');
            } else if (res.data === 2) { // REPLY_DB_ERROR

                this.setState({
                    mail: "",
                    password: ""
                });
            } else if (res.data === 1) { // REPLY_OK
                //redirectHome(this.props.history);
                //useNavigate()("/home");
                this.props.history('/home');
            }
        });*/
        UserService.userLogin(user, this.props.history);
    }

    render() {
        return (
            <div>
                <span>This is the login page !</span>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="mail" name="mail" onChange={this.handleMailChange} required/>
                    <input type="text" id="password" name="password" onChange={this.handlePasswordChange} required/>

                    <input type="submit" value="Submit"></input>
                </form>
                <span>Don't have an account yet ? <Link to="/signup">Signup now !</Link></span>
            </div>
        );
    }
}

export default withRouter(LoginComponent);