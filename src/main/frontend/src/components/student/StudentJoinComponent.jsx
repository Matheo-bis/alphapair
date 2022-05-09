import React, { Component } from 'react';
import UserService from '../../services/UserService';
import withRouter from '../Router';

class StudentJoinComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isPromless: false,
            promotionId: ""
        }
    }

    componentDidMount() {
        UserService.userIsStudentPromless(
            null,
            (res) => {
                if (!res) { // in case the student alraedy has a promotion
                    window.location = "/home";
                } else {
                    this.setState({
                        isPromless: true
                    })
                }
            }
        )
    }

    handlePromotionIdChange = (event) => {
        this.setState({promotionId: event.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const rawPromotionId = {
            promotionId: this.state.promotionId
        };

        UserService.userUpdatePromotion(
            rawPromotionId,
            (res) => window.location = "/home"
        )
    }

    render() {
        if (this.state.isPromless)
            return (
                <div>
                    Student join class page.
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="promotionId" name="promotionId" onChange={this.handlePromotionIdChange} required/>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            );
        else
                return <div>Loading...</div>
    }
}

export default withRouter(StudentJoinComponent);