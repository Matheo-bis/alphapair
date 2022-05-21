import { Button } from '@mui/material';
import React, { Component } from 'react';
import PromotionService from '../../services/PromotionService';
import withRouter from '../Router';

class AdminPromotionPairsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promotionId: this.props.params.id
        }
    }

    handleNewAssignment = () => {
        PromotionService.getNewAssignment(
            this.state.promotionId,
            (res) => console.log(res)
        )
    }

    render() {
        return (
            <div>
                Admin pairs for class with id {this.state.promotionId}
                <Button onClick={() => this.handleNewAssignment()}>LANCER LA REPARTITION</Button>
            </div>
        );
    }
}

export default withRouter(AdminPromotionPairsComponent);