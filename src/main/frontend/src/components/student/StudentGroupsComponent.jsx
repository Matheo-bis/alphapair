import React, { Component } from 'react';
import GroupService from '../../services/GroupService';
import Protocol from '../../services/Protocol';
import UserService from '../../services/UserService';
import withRouter from '../Router';

class StudentGroupsComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        GroupService.getPromotionGroups(
            Protocol.UNKNOWN_ID,
            (res) => this.setState({groups: res})
        )
    }

    handleJoinGroup = (groupId) => {
        UserService.userUpdateGroup(
            {
                groupId: groupId
            },
            (res) => window.location.reload(false)
        )
    }

    render() {
        return (
            <div>
                Student groups component.
                <table className="table">
                    <thead>
                        <tr>
                            <th>Group Id</th>
                            <th>GroupIsLocked</th>
                            <th>Join this group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.groups.map(
                            
                            group =>
                            <tr key= {group.id}>
                                <td>{group.id}</td>
                                <td>{group.isLocked ? "true" : "false"}</td>
                                <td><button onClick={() => this.handleJoinGroup(group.id)}>Join this group</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(StudentGroupsComponent);