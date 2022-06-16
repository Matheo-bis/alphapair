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

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

function AdminListPromotionsComponent(props) {
    const classes = useStyles();

    const [open, setOpen] = useState({rank: 0, task: 0});
    const [formError, setFormError] = useState(false);
    var newName = "", className = "";
    const handleClose = () => {
        setOpen({rank: 0, task: 0});
        setFormError(false);
    }
    const handleRename = (id, index) => {
        if (newName === "") {
            setFormError(true);
            return;
        }
        PromotionService.updatePromotionField(
            {
                id: id,
                name: newName
            },
            (res) => {
                const newPromotions = [...promotions];
                newPromotions[index].name = newName;
                setPromotions(newPromotions);

                setOpen({rank: 0, task: 0});
                setFormError(false);
            }
        )
    }
    const handleDelete = (id, index) => {
        if (className !== promotions[index].name) {
            setFormError(true);
            return;
        }
        PromotionService.deletePromotion(
            id,
            (res) => {
                const newPromotions = [...promotions];
                newPromotions.splice(index, 1)
                setPromotions(newPromotions);
                setOpen({rank: 0, task: 0});
            }
        )
    }
    
    const [promotions, setPromotions] = useState([]);
    const [remaining, setRemaining] = useState(1);
    

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
        PromotionService.getAllPromotions(
            null, 
            function(res) {
                setPromotions(res);
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
                            <Typography>{"Classes"}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Liste des classes</Typography>
                    </Grid>
                    <Tooltip title="Créer une nouvelle classe" placement="left" arrow>
                        <Fab component={RouterLink} to="/create" className={classes.blue_card} style={{marginTop: 10}}>
                            <Add style={{color: "white"}}/>
                        </Fab>
                    </Tooltip>
                    
                    
                    <Grid item xs={12}>
                        <BaseCard>
                            <List>                                    
                                {
                                    promotions.map((p, i) =>
                                    <div key={p.id}>
                                        <ListItem key={p.id}>
                                            <ListItemText
                                                primary={<RouterLink to={"/class/" + p.id} style={{textDecoration: "none"}}>
                                                    <span className={classes.title_link} style={{fontFamily: "dm-700", color: "black"}}>{p.name}</span>
                                                </RouterLink>}
                                                secondary={<span style={{fontStyle: "italic"}}>{"@" + p.id}</span>}
                                            />
                                            <Tooltip title="Renommer la classe" placement="left" arrow>
                                                <IconButton
                                                    onClick={() => setOpen({rank: i + 1, task: 1})}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    style={{marginLeft: "0"}}
                                                >
                                                    <DriveFileRenameOutlineRounded/>
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog open={(open.rank === i+1) && (open.task === 1)} onClose={handleClose}>
                                                <DialogTitle style={{fontFamily: "dm-700"}}>Renommer la classe</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Entrez le nouveau nom de la classe :
                                                    </DialogContentText>
                                                    <TextField
                                                        value={p.name}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Nouveau nom de la classe"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => newName = e.target.value}
                                                        error = {formError}
                                                        helperText={formError ? "Le nom de la classe ne peut être vide !" : ""}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Annuler</Button>
                                                    <Button onClick={() => handleRename(p.id, i)}>Renommer</Button>
                                                </DialogActions>
                                            </Dialog>

                                            <Tooltip title="Supprimer la classe" placement="left" arrow>
                                                <IconButton
                                                    onClick={() => setOpen({rank: i + 1, task: 2})}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    style={{marginLeft: "0"}}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog open={(open.rank === i+1) && (open.task === 2)} onClose={handleClose}>
                                                <DialogTitle style={{fontFamily: "dm-700"}}>Supprimer la classe</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        <Stack direction="column">
                                                            <span>
                                                                Attention : cette action est irréversible.
                                                            </span>
                                                            <span>
                                                            La suppression de cette classe supprimera tous ses sujets, groupes et répartition courante. Ses étudiants en seront expulsés.
                                                            </span>
                                                            <span>
                                                            Ecrivez le nom de la classe ({p.name}) pour confirmer.
                                                            </span>
                                                        </Stack>
                                                        
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Nom de la classe"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => className = e.target.value}
                                                        error = {formError}
                                                        helperText={formError ? "Le nom spécifié n'est pas celui de la classe !" : ""}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Annuler</Button>
                                                    <Button color='error' onClick={() => handleDelete(p.id, i)}>Supprimer</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </ListItem>
                                        
                                            
                                        {
                                            (i < promotions.length - 1) && <Divider style={{height: 1}}/>
                                        }
                                        
                                    </div>
                                    )
                                }
                            </List>
                        </BaseCard>
                    </Grid>
                    <Button onClick={() => PromotionService.populatePromotion(null, (res) => window.location.href = "/class/" + res)}>
                        Crate a mock class
                    </Button>
                </Grid>
            </div>
        );
    else
        return <BufferComponent/>
}

export default AdminListPromotionsComponent;