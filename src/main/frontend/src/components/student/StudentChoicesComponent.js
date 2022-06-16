import { Close, Looks3, LooksOne, LooksTwo, Save } from '@mui/icons-material';
import { Alert, Breadcrumbs, Divider, Grid, IconButton, Link, List, ListItem, ListItemText, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
//import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GroupService from '../../services/GroupService';
import Protocol from '../../services/Protocol';
import SubjectService from '../../services/SubjectService';
import UserService from '../../services/UserService';
//import { styles } from '../../styles/style';
import AlphapairButton from '../AlphapairButton';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';

//const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

let wishes = [], initialWishes = [];

function StudentChoicesComponent(props) {
    //const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({})
    const [group, setGroup] = useState([]);
    
    const [isGroupless, setIsGroupless] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const [remaining, setRemaining] = useState(3);
    const [hasChanged, setHasChanged] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(false);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    const handleSaveWishes = () => {
        // checking that all wishes are not null and different
        let encounteredIds = [];
        for (let i = 0 ; i < wishes.length ; i++) {
            if (wishes[i] === null || wishes[i] === "") {
                return;
            } else {
                if (encounteredIds.includes(wishes[i].id)) {
                    return;
                } else {
                    encounteredIds.push(wishes[i].id);
                }
            }
        }
        
        // ids are properly defined, proceed to request
        let body = {
            choice1: wishes[0].id,
            choice2: wishes[1].id,
            choice3: wishes[2].id,
            groupId: Protocol.UNKNOWN_ID
        }

        GroupService.setGroupChoices(
            body,
            (res) => {
                setOpen(true);
                initialWishes = wishes.slice();
                setHasChanged(false);
            }
        );


    }

    const handleCancel = () => {
        wishes = initialWishes.slice();
        setForceRefresh(!forceRefresh);
        setHasChanged(false);
    }


    const setWish = (rank, subjectId) => {
        // removing the subject from wherever it was in wishes before
        for (let i = 0 ; i < wishes.length ; i++) {
            if (wishes[i] !== null && wishes[i].id === subjectId) {
                wishes[i] = null;
            }
        }
        
        let clickedSubject = null;
        for (let i = 0 ; i < subjects.length ; i++) {
            
            if (subjects[i].id === subjectId) {
                clickedSubject = subjects[i];
                break;
            }
        }
        
        wishes[rank] = clickedSubject;
        console.log(wishes);
        if (!hasChanged) setHasChanged(true);
        setForceRefresh(!forceRefresh);
    }

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
        )
    }, [])

    if (remaining === 0) {
        
        // setting up initial wishes
        if (wishes.length === 0 && !isGroupless) {
            console.log("setting up wishes ...(" + isGroupless + ")")
            let newWishes = [];
            if (group.choices.length === 0) {
                newWishes = [null, null, null];
            } else {
                group.choices.forEach((wish, i) => {
                    for (let i = 0 ; i < subjects.length ; i++) {
                        if (subjects[i].id === wish) {
                            newWishes.push(subjects[i]);
                            break;
                        }
                    }
                });    
            }
            
            
            wishes = newWishes;
            console.log(wishes);
            console.log(wishes.length);
            initialWishes = newWishes.slice();
        }

        return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Typography>{"Vœux"}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Vœux de mon groupe</Typography>
                    </Grid>                    
                    {
                        !isGroupless &&
                        <Stack orientation="column" style={{margin:"auto"}}>
                            <Grid container style={{margin:"auto"}}>
                                <Grid item xs={7}> 
                                    <BaseCard title="Projets" >
                                        <List style={{overflow: "scroll", overflowX: "hidden", maxHeight: "300px"}}>
                                            {
                                                subjects.map((subject, i) => {

                                                return <div key={i}>
                                                    <ListItem >
                                                        <ListItemText
                                                            primary={<span style={{fontFamily: "dm-700", color: "black"}}>{subject.name}</span>}
                                                            secondary={<span style={{fontStyle: "italic"}}>{subject.supervisor}</span>}
                                                        />
                                                        
                                                        <Tooltip title="Choisir comme vœu n°1" placement="top" arrow>
                                                            <IconButton
                                                                size="small"
                                                                sx={{ ml: 2 }}
                                                                style={{marginLeft: "0"}}
                                                                onClick = {() => setWish(0, subject.id)}
                                                            >
                                                                <LooksOne/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Choisir comme vœu n°2" placement="top" arrow>
                                                            <IconButton
                                                                size="small"
                                                                sx={{ ml: 2 }}
                                                                style={{marginLeft: "0"}}
                                                                onClick = {() => setWish(1, subject.id)}
                                                            >
                                                                <LooksTwo/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Choisir comme vœu n°3" placement="top" arrow>
                                                            <IconButton
                                                                size="small"
                                                                sx={{ ml: 2 }}
                                                                style={{marginLeft: "0"}}
                                                                onClick = {() => setWish(2, subject.id)}
                                                            >
                                                                <Looks3/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        
                                                    </ListItem>
                                                    
                                                        
                                                    {
                                                        (i < subjects.length - 1) && <Divider style={{height: 1}}/>
                                                    }
                                                    
                                                </div>
                                                }
                                                )
                                            }
                                        </List>
                                    </BaseCard>
                                </Grid>
                            
                                <Grid item xs={5}>
                                    <Stack direction="column">
                                        {
                                            wishes.map((wish, i) =>
                                            <BaseCard
                                                title={"Vœu n°" + (i+1)} icon={[LooksOne, LooksTwo, Looks3][i]}
                                                style={{height: 102.5, width: 300}}
                                            >
                                                <span style={{marginLeft:"50px", fontSize:20, fontStyle: wish === null ? "italic" : "", color: wish === null ? "gray" : ""}}>{wish === null ? "Pas de choix n° " + (i+1) +" défini" : wish.name}</span>
                                            </BaseCard>    
                                            )
                                        }
                                        
                                    </Stack>
                                </Grid>
                            </Grid>
                            {
                                hasChanged &&
                                <div style={{margin:"auto"}}>
                                    <AlphapairButton style={{marginRight: 20}} onClick={() => handleCancel()}>
                                        <span>Annuler</span>
                                        <Close/>
                                    </AlphapairButton>
                                    <AlphapairButton onClick={() => handleSaveWishes()} disabled={wishes.includes(null)}>
                                        <span>Enregistrer</span>
                                        <Save/>
                                    </AlphapairButton>
                                </div>
                            }
                        </Stack>
                    }
                    {
                        isGroupless &&
                        <Grid item xs={11} lg={11}>
                            <span>Oh non ! Vous ne faites partie d'aucun groupe. </span>
                            <span><RouterLink to="/groups">Rejoignez un groupe</RouterLink> dès maintenant !</span>
                        </Grid>
                    }
                </Grid>
                <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Vœux enregistrés !
                    </Alert>
                </Snackbar>
            </div>
        );
    } else
        return <BufferComponent/>
}

export default StudentChoicesComponent;