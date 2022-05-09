import React, { Component } from 'react';
import Protocol from '../../services/Protocol';
import SubjectService from '../../services/SubjectService';
import withRouter from '../Router';

class StudentSubjectsComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        SubjectService.getPromotionSubjects(
            Protocol.UNKNOWN_ID,
            (res) => this.setState({subjects: res})
        )
    }

    render() {
        return (
            <div>
                Student subjects component.
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(StudentSubjectsComponent);