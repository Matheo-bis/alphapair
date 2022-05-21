import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PromotionService from '../../services/PromotionService';
import withRouter from '../Router';

class AdminHomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promotions: []
        }
    }

    componentDidMount() {
        PromotionService.getAllPromotions(
            null,
            (res) => this.setState({promotions: res})
        )
    }

    handleDelete = (id) => {
        PromotionService.deletePromotion(
            id,
            (res) => window.location.reload(false)
        )
    }

    render() {
        return (
            <div>
                List of all promotions :
                <Link to="/create">Create a new class...</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Class name</th>
                            <th>Class limit date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.promotions.map(
                            
                            promotion =>
                            <tr key= {promotion.id}>
                                <td><Link to={`/class/${promotion.id}`}>{promotion.name}</Link></td>
                                <td>{promotion.limitDate}</td>
                                <td><button onClick={() => this.handleDelete(promotion.id)}>Delete this class</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(AdminHomeComponent);