import { Box, Breadcrumbs, Button, Grid, Link, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupService from '../../services/GroupService';
import { Link as RouterLink } from 'react-router-dom';
import PromotionService from '../../services/PromotionService';
import SubjectService from '../../services/SubjectService';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';
import AlphapairButton from '../AlphapairButton';
import { ArrowForward } from '@mui/icons-material';


const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

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
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/classes">
                                Classes
                            </Link>
                            <Link component={LinkBehavior} underline="hover" color="inherit" href={"/class/" + promotionId}>
                                Classes
                            </Link>
                            <Typography>Répartition</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Répartition</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={6} lg={7}>
                        <BaseCard title="Répartition courante" style={{minHeight: "180px"}}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {
                                            subjects.map((subject, i) => <th key={subject.id} style={{width: 20}}>
                                                <span style={{writingMode: "vertical-rl", transform:"scale(-1)"}}>P. {i + 1}</span>
                                                </th>)
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    groups.map((group, i) =>
                                    
                                    <tr key= {group.id}>
                                        <td style={{height: 15}}>Groupe {i+1}</td>
                                        {
                                            subjects.map(subject => {
                                                return <td border="1px" style={{backgroundColor: promotion.assignment[i] === subject.id ? "#2ecc71" : "white", border:"10px black" }} key={subject.id}>
                                                    
                                                </td>
                                            })
                                        }
                                        
                                    </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </BaseCard>
                    </Grid>
                    <Grid item xs={6} lg={5}>
                        <BaseCard title="Modifier" style={{height: "300px"}}>
                            <Tooltip style={{margin: "auto"}} title="Relancer la répartition" placement="left" arrow>
                                <AlphapairButton
                                    
                                    onClick={() => {
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
                                    <span>Relancer la répartition</span>
                                    <ArrowForward/>
                                </AlphapairButton>
                            </Tooltip>
                        </BaseCard>
                    </Grid>
                </Grid>
            </div>
        );
    else {
        return <BufferComponent/>
    }
        
}

export default AdminPromotionPairsComponent;