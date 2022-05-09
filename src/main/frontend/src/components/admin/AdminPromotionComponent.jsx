import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PromotionService from '../../services/PromotionService';
import SubjectService from '../../services/SubjectService';
import withRouter from '../Router';

class AdminPromotionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promotionId: this.props.params.id,
            promotion: null,
            subjects: [],

            // number of requests
            remainingRequests: 2
        }
    }

    componentDidMount() {
        PromotionService.getPromotion(
            this.state.promotionId,
            (res) => this.setState({promotion: res, remainingRequests: this.state.remainingRequests - 1})
        );

        SubjectService.getPromotionSubjects(
            this.state.promotionId,
            (res) => this.setState({subjects: res, remainingRequests: this.state.remainingRequests - 1})
        )
    }

    handleUpdate = () => {
        PromotionService.updatePromotionField(
            {
                id: this.state.promotionId,
                name: "69"
            },
            (res) => window.location.reload(false)
        )
    }

    handleDelete = () => {
        PromotionService.deletePromotion(
            this.state.promotionId,
            (res) => window.location = "/home/"
        )
    }

    render() {
        if (this.state.remainingRequests === 0) {
            console.log(this.state.subjects);
            return (
                <div>
                    <div>
                        <h1>Promotion : {this.state.promotion.name}</h1>
                        Admin dashboard for class with id {this.state.promotionId}
                    </div>
                    <button onClick={this.handleUpdate}>set name to 69...</button>
                    <button onClick={this.handleDelete}>Delete</button>
                    <Link to="/home">Back home</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Subject Description</th>
                                <th>Subject Supervisor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.subjects.map(
                                
                                subject =>
                                <tr key= {subject.id}>
                                    <td>{subject.name}</td>
                                    <td>{subject.description}</td>
                                    <td>{subject.supervisor}</td>
                                </tr>
                            )
                            }
                            <tr>
                                <td><Link to={`/class/${this.state.promotionId}/subjects`}>Edit subjects...</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            );
        } else
            return (
                <div>Loading...</div>
            );
    }
}

export default withRouter(AdminPromotionComponent);