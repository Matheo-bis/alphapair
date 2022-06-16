import { DriveFileMove, Looks3, LooksOne, LooksTwo } from '@mui/icons-material';
import { Breadcrumbs, Button, Divider, Grid, IconButton, Link, List, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GroupService from '../../services/GroupService';
import PromotionService from '../../services/PromotionService';
import Protocol from '../../services/Protocol';
import SubjectService from '../../services/SubjectService';
import UserService from '../../services/UserService';
import { styles } from '../../styles/style';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

let wishes = [], initialWishes = [];

function StudentPairsComponent(props) {
    const classes = useStyles();

    const [user, setUser] = useState({})
    const [group, setGroup] = useState([]);
    const [promotion, setPromotion] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    
    const [isGroupless, setIsGroupless] = useState(false);
    const [remaining, setRemaining] = useState(5);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        SubjectService.getPromotionSubjects(
            Protocol.UNKNOWN_ID, 
            function(res) {
                let newSubjects = res.slice();
                console.log(newSubjects);
                for (let i = 0 ; i < newSubjects.length ; i++) {
                    newSubjects[i].name = newSubjects[i].name.split("-")[1];
                }
                setSubjects(newSubjects);
                requestOk();
            }
        );
        UserService.userGetSelf(
            null,
            function(res) {
                setUser(res);
                requestOk();
            }
        );
        GroupService.getGroup(
            Protocol.UNKNOWN_ID,
            function(res) {   
                console.log(res);
                if (res === "") {
                    setIsGroupless(true);
                    console.log("GROUPLESS!")
                }
                setGroup(res);
                requestOk();
            }
        );
        PromotionService.getPromotion(
            Protocol.UNKNOWN_ID,
            function(res) {
                setPromotion(res);
                requestOk();
            }
        );
        GroupService.getPromotionGroups(
            Protocol.UNKNOWN_ID,
            (res) => {
                setGroups(res.groups);
                requestOk();
            }
        );
    }, [])

    if (remaining === 0) {

        return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Typography>{"Répartition"}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Répartition courante</Typography>
                    </Grid>                    
                    {
                        !isGroupless &&
                        <div>
                            <Button onClick={() => {
                                PromotionService.getNewAssignment(
                                    promotion.id,
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
                                            <td style={{color: group.id === user.groupId ? "red" : ""}}>Groupe {i + 1}</td>
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
                    }
                    {
                        isGroupless &&
                        <Grid item xs={11} lg={11}>
                            <span>Oh non ! Vous ne faites partie d'aucun groupe. </span>
                            <span><RouterLink to="/groups">Rejoignez un groupe</RouterLink> dès maintenant !</span>
                        </Grid>
                    }
                </Grid>
            </div>
        );
    } else
        return <BufferComponent/>
}

export default StudentPairsComponent;