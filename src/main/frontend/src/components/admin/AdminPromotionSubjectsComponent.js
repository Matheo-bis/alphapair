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
import Protocol from '../../services/Protocol';
import SubjectService from '../../services/SubjectService';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

function AdminPromotionSubjectsComponent(props) {
    const classes = useStyles();

    const promotionId = props.params.id;

    const [open, setOpen] = useState(0);
    const [formErrorName, setFormErrorName] = useState(false);
    const [formErrorProf, setFormErrorProf] = useState(false);
    var newName = "";
    var newProf = "";
    var newDesc = "";
    const handleClose = () => {
        setOpen(0);
    }

    const handleEdit = (id, index) => {
        console.log(newName);
        var hasFoundErrors = false;
        if (newName === "" || newName.includes("-")) {
            setFormErrorName(true);
            hasFoundErrors = true;
        }
        if (newProf === "") {
            setFormErrorProf(true);
            hasFoundErrors = true;
        }
        if (hasFoundErrors) return;

        // ready to send request.
    }


    const [subjects, setSubjects] = useState([]);
    const [remaining, setRemaining] = useState(1);
    

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        SubjectService.getPromotionSubjects(
            promotionId,
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
                                            <Tooltip title="Modifier le projet" placement="left" arrow>
                                                <IconButton
                                                    onClick={() => {
                                                            setOpen(i+1);
                                                            newName = s.name;
                                                            console.log("newName : " + newName);
                                                            newProf = s.supervisor;
                                                            newDesc = s.description;
                                                        }
                                                    }
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    style={{marginLeft: "0"}}
                                                >
                                                    <DriveFileRenameOutlineRounded/>
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog open={open === (i+1)} onClose={handleClose}>
                                                <DialogTitle style={{fontFamily: "dm-700"}}>Modifier le projet</DialogTitle>
                                                <DialogContent>
                                                    
                                                    <TextField
                                                        value={s.name}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Nom du projet"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => newName = e.target.value}
                                                        error = {formErrorName}
                                                        helperText={formErrorName ? "Le nom du projet n'est pas valide !" : ""}
                                                    />
                                                    <TextField
                                                        value={s.supervisor}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Professeur référent du projet"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => newProf = e.target.value}
                                                        error = {formErrorProf}
                                                        helperText={formErrorProf ? "Le nom du professeur référent ne peut être vide !" : ""}
                                                    />
                                                    <TextField
                                                        value={s.description}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Description du projet"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => newDesc = e.target.value}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Annuler</Button>
                                                    <Button onClick={() => handleEdit(s.id, i)}>Modifier le projet</Button>
                                                </DialogActions>
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

export default AdminPromotionSubjectsComponent;