import React, { Component } from 'react';
import withRouter from '../Router';

class AdminPromotionStudentsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            promotionId: this.props.params.id
        }
    }

    render() {
        return (
            <div>
                Admin students for class with id {this.state.promotionId}
            </div>
        );
    }
}

export default withRouter(AdminPromotionStudentsComponent);