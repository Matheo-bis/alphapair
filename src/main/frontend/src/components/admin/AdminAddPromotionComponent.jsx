import React, { Component } from 'react';
import PromotionService from '../../services/PromotionService';
import UserService from '../../services/UserService';
import withRouter from '../Router';

class AdminAddPromotionComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: "default",
            name: "",
            limitDate: "",
            isStudentEditable: ""
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handlelimitDateChange = (event) => {
        this.setState({limitDate: event.target.value});
    }
    handleisStudentEditableChange = (event) => {
        this.setState({isStudentEditable: event.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const promotion = {
            name: this.state.name,
            limitDate: this.state.limitDate,
            isStudentEditable: this.state.isStudentEditable,
            subjects : [
                {
                    name: "Subject1",
                    professor: "Professor1",
                    description: "Description1"
                },
                {
                    name: "Subject2",
                    professor: "Professor2",
                    description: "Description2"
                },
                {
                    name: "Subject3",
                    professor: "Professor3",
                    description: "Description3"
                }
            ]
        };

        PromotionService.addPromotion(
            promotion,
            (res) => window.location = "/class/" + res
        );
    }

    render() {
        return (
            <div>
                Create a new promotion : 
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="name" name="name" onChange={this.handleNameChange} required/>
                    <input type="text" id="limitDate" name="limitDate" onChange={this.handlelimitDateChange} required/>
                    <input type="text" id="isStudentEditable" name="isStudentEditable" onChange={this.handleisStudentEditableChange} required/>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default withRouter(AdminAddPromotionComponent);