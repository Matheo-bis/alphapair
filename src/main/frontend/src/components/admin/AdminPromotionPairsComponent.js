import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupService from '../../services/GroupService';
import PromotionService from '../../services/PromotionService';
import SubjectService from '../../services/SubjectService';

const AdminPromotionPairsComponent = (props) => {
    const promotionId = props.params.id;

    const [promotion, setPromotion] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [remaining, setRemaining] = useState(3);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        PromotionService.getPromotion(
            promotionId, 
            function(res) {
                setPromotion(res);
                requestOk();
            }
        );
        SubjectService.getPromotionSubjects(
            promotionId,
            function (res) {
                setSubjects(res);
                requestOk();
            }
        )
        GroupService.getPromotionGroups(
            promotionId,
            (res) => {
                setGroups(res.groups);
                requestOk();
            }
        );
    }, [promotionId])

    if (remaining === 0)
        return (
            <div>
                <Button onClick={() => {
                    PromotionService.getNewAssignment(
                        promotionId,
                        (res) => {
                            setPromotion({
                                ...promotion,
                                assignment: res
                              })
                        })
                }}
                >
                    Relancer la répartition
                </Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            {
                                subjects.map((subject, i) => <th key={subject.id}>S{i + 1}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                        groups.map((group, i) =>
                            <tr key= {group.id}>
                                <td>Groupe {i + 1}</td>
                                {
                                    subjects.map(subject => {
                                        return <td style={{backgroundColor: promotion.assignment[i] === subject.id ? "green" : "white  "}} key={subject.id}>x</td>
                                    })
                                }
                                
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        );
    else {
        return "Loading";
    }
        
}

export default AdminPromotionPairsComponent;