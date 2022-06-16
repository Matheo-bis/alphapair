import { Close } from '@mui/icons-material';
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

function AdminPromotionStudentsComponent(props) {
    const [open, setOpen] = useState(0);
    const handleWithdraw = (index) => {
        UserService.userUpdatePromotion(
            {
                studentMail: students[index].mail,
                promotionId: ""
            },
            (res) => {
                setStudents(students => students.filter((student, i) => i !== index));
                setOpen(0);
            }
        )
    }


    const promotionId = props.params.id;

    const [promotion, setPromotion] = useState({});
    const [students, setStudents] = useState([]);
    const [remaining, setRemaining] = useState(2);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        PromotionService.getPromotion(
            promotionId, 
            function(res) {
                setPromotion(res);
                requestOk();
            }
        );
        PromotionService.getPromotionStudents(
            promotionId,
            function(res) {
                setStudents(res);
                requestOk();
            }
        )
    }, [promotionId])

    if (remaining === 0)
        return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Stack direction="row">
                            <div>
                                <Breadcrumbs separator=">">
                                    <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                        Accueil
                                    </Link>
                                    <Link component={LinkBehavior} underline="hover" color="inherit" href="/classes">
                                        Classes
                                    </Link>
                                    <Link component={LinkBehavior} underline="hover" color="inherit" href={"/class/" + promotionId}>
                                        {promotion.name}
                                    </Link>
                                    <Typography>Étudiants</Typography>
                                </Breadcrumbs>
                                <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Liste des étudiants</Typography>
                            </div>
                            <Typography  style={{marginLeft: 300, marginTop: 40, fontFamily: "dm-400", fontSize: 15}}>{students.length} étudiants dans la classe</Typography>
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
                                                primary={<span style={{fontFamily: "dm-700"}}>{student.lastName + " " + student.firstName}</span>}
                                                secondary={student.mail}
                                            />
                                            <Tooltip title="Retirer l'étudiant de la classe" placement="left" arrow>
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
                                                        Êtes-vous sûr de vouloir retirer cet étudiant ?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setOpen(0)}>Annuler</Button>
                                                    <Button onClick={() => handleWithdraw(i)}>Retirer</Button>
                                                </DialogActions>
                                            </Dialog>
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

export default AdminPromotionStudentsComponent;