import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Grid, IconButton, Link, List, ListItem, ListItemText, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { styles } from '../../styles/style';
import BaseCard from '../BaseCard';
import PromotionService from '../../services/PromotionService';
import BufferComponent from '../BufferComponent';
import { Add, Delete, DriveFileRenameOutlineRounded, PlusOne } from '@mui/icons-material';
import { ClassNames } from '@emotion/react';
import StudentChoicesComponent from './StudentChoicesComponent';
import Protocol from '../../services/Protocol';
import SubjectService from '../../services/SubjectService';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

function StudentSubjectsComponent(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(0);
    const handleClose = () => {
        setOpen(0);
    }


    const [subjects, setSubjects] = useState([]);
    const [remaining, setRemaining] = useState(1);
    

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        SubjectService.getPromotionSubjects(
            Protocol.UNKNOWN_ID,
            (res) => {
                for (let i = 0 ; i < res.length ; i++) {
                    res[i].name = res[i].name.split("-")[1];
                }
                setSubjects(res);
                requestOk();
            }
        );
        
        

    }, [])

    if (remaining === 0)
        return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Typography>{"Projets"}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Liste des projets</Typography>
                    </Grid>
            
                    <Grid item xs={12}>
                        <BaseCard>
                            <List>                                    
                                {
                                    subjects.map((s, i) =>
                                    <div key={s.id}>
                                        <ListItem key={s.id}>
                                            <ListItemText
                                                primary={<Button className={classes.title_link} onClick={() => setOpen(i+1)} style={{textDecoration: "none"}}>
                                                    <span className={classes.title_link} style={{fontFamily: "dm-700", color: "black"}}>{s.name}</span>
                                                </Button>}
                                                secondary={<span style={{fontStyle: "italic"}}>{"Professeur encadrant : " + s.supervisor}</span>}
                                            />
                                            <Dialog open={open === i+1} onClose={handleClose}>
                                                <DialogTitle style={{fontFamily: "dm-700"}}>{s.name}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Professeur encadrant : {s.supervisor}
                                                    </DialogContentText>
                                                    <DialogContentText>
                                                        Description du projet : {s.description}
                                                    </DialogContentText>
                                                </DialogContent>
                                            </Dialog>
                                        </ListItem>
                                        
                                            
                                        {
                                            (i < subjects.length - 1) && <Divider style={{height: 1}}/>
                                        }
                                        
                                    </div>
                                    )
                                }
                            </List>
                        </BaseCard>
                    </Grid>
                </Grid>
            </div>
        );
    else
        return <BufferComponent/>
}

export default StudentSubjectsComponent;