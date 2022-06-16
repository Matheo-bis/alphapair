import React, { Component } from 'react';
import withRouter from '../Router';

class AdminPromotionSubjectsComponentBeta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            promotionId: this.props.params.id
        }
    }

    render() {
        return (
            <div>
                Admin subjects for class with id {this.state.promotionId}
            </div>
        );
    }
}

export default withRouter(AdminPromotionSubjectsComponentBeta);