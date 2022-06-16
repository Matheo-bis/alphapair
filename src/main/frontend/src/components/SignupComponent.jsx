import { CssBaseline, Stack, Toolbar } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import alphapair_blue from "../assets/alphapair_blue.svg";
import NavBarComponent from './NavBarComponent';
import withRouter from './Router';

class SignupComponent extends Component {
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
            password: this.state.password,
            firstName: this.state.mail,
            lastName: this.state.mail,
            isAdmin: false,
            groupId: "",
            promotionId: ""
        };
        UserService.userSignup(user, this.props.history);
    }

    render() {
        return (
            
            <div>
                <CssBaseline/>
                <NavBarComponent user={null}/>
                <Toolbar/>
                <Stack orientation="column">
                    <span style={{margin: "auto", fontSize: 20, marginTop: 10}}>Bienvenue sur la plateforme</span>
                    <span style={{margin: "auto", display:"flex", marginTop: 1}}>
                        <img alt="alphapair icon" src={alphapair_blue} style={{marginTop: 15, height: "65px", marginRight: 10}}/>
                        <span style={{marginLeft: 10, fontFamily: "dm-700", color: "#5865F2", fontSize: 60}}>alphapair</span>
                    </span>
                    
                    <span style={{margin: "auto", fontSize: 40, marginTop: 80, fontFamily: "dm-700"}}>Inscription</span>
                    <form style={{margin: "auto"}} onSubmit={this.handleSubmit}>
                        <input type="text" id="mail" name="mail" onChange={this.handleMailChange} required/>
                        <input style={{marginLeft: 10}} type="input" id="password" name="password" onChange={this.handlePasswordChange} required/>

                        <input style={{marginLeft: 10}} type="submit" value="Inscription"></input>
                    </form>
                    <span style={{margin: "auto",marginTop: 10}}>Déjà un compte ? <Link to="/login">Se connecter</Link></span>
                </Stack>
            </div>
        );
    }
}

export default withRouter(SignupComponent);