import { Close, Router } from '@mui/icons-material';
import { Avatar, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PromotionService from '../../services/PromotionService';
import UserService from '../../services/UserService';
import { getAvatarColorFromName } from '../../styles/style';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

function AdminStudentsComponent(props) {
    const [open, setOpen] = useState(0);

    const getPromotionNameFromId = (id) => {
        for (let i = 0 ; i < promotions.length ; i++) {
            if (id === promotions[i].id) {
                return promotions[i].name;
            }
        }
        return null;
    }

    const handleWithdraw = (index) => {
        UserService.userUpdatePromotion(
            {
                studentMail: students[index].mail,
                promotionId: ""
            },
            (res) => {
                let newStudents = students.slice();
                newStudents[index].promotionId = "";
                setStudents(newStudents);
                setOpen(0);
            }
        )
    }

    const [promotions, setPromotions] = useState({});
    const [students, setStudents] = useState([]);
    const [remaining, setRemaining] = useState(2);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        PromotionService.getAllPromotions(
            null, 
            function(res) {
                setPromotions(res);
                requestOk();
            }
        );
        UserService.userGetAllStudents(
            null,
            function(res) {
                setStudents(
                    res.sort(function (s1, s2) {
                        return s1.lastName.toUpperCase() > s2.lastName.toUpperCase() ? 1 : -1;
                    })
                );
                requestOk();
            }
        )
    }, [])

    if (remaining === 0)
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <Stack direction="row" xs={12}>
                            <div>
                                <Breadcrumbs separator=">">
                                    <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                        Accueil
                                    </Link>
                                    <Typography>Étudiants</Typography>
                                </Breadcrumbs>
                                <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Liste de tous les étudants</Typography>
                            </div>
                            <Typography  style={{marginLeft: 300, marginTop: 40, fontFamily: "dm-400", fontSize: 15}}>{students.length} étudiants dans la base de données</Typography>
                        </Stack>
                        
                    </Grid>
                    
                    <Grid item xs={12}>
                        <BaseCard>
                            <List>                                    
                                {
                                    students.map((student, i) =>
                                    <div key={student.mail}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar 
                                                    sx={{ bgcolor: getAvatarColorFromName(student.mail)}}
                                                >
                                                    {(student.firstName[0] + student.lastName[0]).toUpperCase()}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<span style={{fontFamily: "dm-700"}}>{student.firstName + " " + student.lastName}</span>}
                                                secondary={
                                                    student.promotionId === "" ?
                                                    <span>N'est inscrit dans aucune classe</span> :
                                                    <span>
                                                        <span>Est inscrit dans la classe : </span>
                                                        <RouterLink to={"/class/" + student.promotionId}>{getPromotionNameFromId(student.promotionId)}</RouterLink>
                                                    </span>

                                                    

                                                    }
                                            />
                                            {
                                                student.promotionId !== "" &&
                                                <div>
                                                    <Tooltip title="Retirer l'étudiant de sa classe" placement="left" arrow>
                                                        <IconButton
                                                            onClick={() => setOpen(i+1)}
                                                            size="small"
                                                            sx={{ ml: 2 }}
                                                            style={{marginLeft: "0"}}
                                                        >
                                                            <Close/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Dialog open={open === (i+1)} onClose={() => setOpen(0)}>
                                                        <DialogTitle style={{fontFamily: "dm-700"}}>Retirer l'étudiant</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Êtes-vous sûr de vouloir retirer cet étudiant de sa classe ?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => setOpen(0)}>Annuler</Button>
                                                            <Button onClick={() => handleWithdraw(i)}>Retirer</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            }
                                            
                                        </ListItem>
                                        
                                            
                                        {
                                            (i < students.length - 1) && <Divider style={{height: 1}}/>
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

export default AdminStudentsComponent;