import { ArrowForward, CalendarMonth, ContentCopy, Delete, DriveFileRenameOutlineRounded, Groups, Home, Key, MoreHoriz } from '@mui/icons-material';
import { Avatar, AvatarGroup, Breadcrumbs, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Grid, IconButton, Link, List, ListItem, ListItemIcon, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GroupService from '../../services/GroupService';
import PromotionService from '../../services/PromotionService';
import SubjectService from '../../services/SubjectService';
import { getAvatarColorFromName, styles } from '../../styles/style';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';
import withRouter from '../Router';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

const AdminPromotionComponent = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const promotionId = props.params.id;

    // handling dialogs
    const [open, setOpen] = useState(0);
    const [formError, setFormError] = useState(false)
    var newName = "", className = "";
    const handleClose = () => {
        setOpen(0);
        setFormError(false);
    }
    const handleRename = () => {
        if (newName === "") {
            setFormError(true);
            return;
        }
        PromotionService.updatePromotionField(
            {
                id: promotionId,
                name: newName
            },
            (res) => {
                setPromotion({
                    ...promotion,
                    name: newName
                });
                setOpen(0);
            }
        )
    }
    const handleDelete = () => {
        if (className !== promotion.name) {
            setFormError(true);
            return;
        }
        PromotionService.deletePromotion(
            promotionId,
            (res) => window.location.href = "/classes"
        )
    }

    const [promotion, setPromotion] = useState({});
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [remaining, setRemaining] = useState(4);

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
            <div >
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/classes">
                                Classes
                            </Link>
                            <Typography>{promotion.name}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Dashboard</Typography>
                    </Grid>
                    <Grid item justifyContent="center" xs={1} lg={1} style={{marginTop: "30px"}}>
                        <Tooltip title="Plus d'actions" placement="left" arrow >
                            <IconButton
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                size=""
                                sx={{ ml: 2 }}
                                aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                                style={{marginLeft: "auto"}}
                            >
                                <MoreHoriz />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0
                                }
                                }
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                            <MenuItem onClick={() => setOpen(1)}>
                                <ListItemIcon>
                                <DriveFileRenameOutlineRounded fontSize="small" />
                                </ListItemIcon>
                                Renommer la classe
                            </MenuItem>
                            <Dialog open={open === 1} onClose={handleClose}>
                                <DialogTitle style={{fontFamily: "dm-700"}}>Renommer la classe</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Entrez le nouveau nom de la classe :
                                    </DialogContentText>
                                    <TextField
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
                                    <Button onClick={handleRename}>Renommer</Button>
                                </DialogActions>
                            </Dialog>
                            <Divider />
                            <MenuItem onClick={() => setOpen(2)}>
                                <ListItemIcon>
                                <Delete color="red" fontSize="small" />
                                </ListItemIcon>
                                <span style={{color: "red"}}>Supprimer la classe</span>
                            </MenuItem>
                            <Dialog open={open === 2} onClose={handleClose}>
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
                                            Ecrivez le nom de la classe pour confirmer.
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
                                    <Button color='error' onClick={handleDelete}>Supprimer</Button>
                                </DialogActions>
                            </Dialog>
                        </Menu>
                    </Grid>

                </Grid>
                    <Grid container spacing={0}>
                        {/* ------------------------- row 1 ------------------------- */}
                        <Grid item xs={4} lg={4}>
                            <BaseCard icon={CalendarMonth} title="Date limite" style={{height: "200px"}}>
                            <Stack spacing={2} direction="column" style={{margin: "auto"}}>
                                <Typography className={classes.blue_text} style={{margin: "auto", marginTop: 20, fontFamily: "dm-700", fontSize: 30}}>6j 3h restants</Typography>
                                <Tooltip title="Changer la date limite" placement="left" arrow >
                                    <Button component={RouterLink} to="/create" className={classes.blue_card} style={{marginTop: 30}}>
                                        <Typography style={{color: "white"}}>Changer la date limite</Typography>
                                        <ArrowForward style={{color: "white"}}/>
                                    </Button>
                                </Tooltip>
                            </Stack>
                            </BaseCard>
                        </Grid>

                        {/* ------------------------- row 1 ------------------------- */}
                        <Grid item xs={5} lg={5}>
                            <BaseCard icon={Groups} className={classes.white_card} title="Étudiants" style={{height: "200px"}}>
                                <Grid container spacing={6}>
                                    <Grid alignContent={"center"} item xs={3}>
                                        <Stack direction="column">
                                            <Typography className={classes.blue_text} style={{fontFamily: "dm-700", fontSize: 80, margin: "auto", paddingLeft: "40px", paddingTop:"7px"}}>{students.length}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Stack direction="column" style={{paddingTop: "32px"}}>
                                            <Stack spacing={0} direction="row" style={{marginLeft: "42px"}}>
                                                <AvatarGroup max={5}>
                                                    {
                                                        students.map((student) =>
                                                            <Avatar key={student.mail}
                                                                sx={{ bgcolor: getAvatarColorFromName(student.mail)}}
                                                            >
                                                                {(student.firstName[0] + student.lastName[0]).toUpperCase()}
                                                            </Avatar>
                                                        )
                                                    }
                                                    
                                                </AvatarGroup>
                                                
                                            </Stack>
                                            <Tooltip title="Gérer les étudiants" placement="bottom" arrow style={{margin: "auto"}}>
                                                <Button component={RouterLink} to={"/class/" + promotionId + "/students"} className={classes.blue_card} style={{marginTop: 10, marginLeft: 25, width: "80%", left:"25px"}}>
                                                    <Typography style={{color: "white"}}>Gérer les étudiants</Typography>
                                                    <ArrowForward style={{color: "white"}}/>
                                                </Button>
                                            </Tooltip>
                                        </Stack>
                                        
                                    </Grid>
                                </Grid>
                                
                            </BaseCard>
                        </Grid>

                        {/* ------------------------- row 1 ------------------------- */}
                        
                        <Grid item xs={3} lg={3}>
                            <BaseCard icon={Key} className={classes.blue_card} title="Code classe" style={{height: "200px", color: "white"}} >
                                <Box display="flex" justifyContent="center">
                                    <Stack direction="column">
                                        <Typography
                                            style={{
                                                color: "white",
                                                fontSize: 50,
                                                fontFamily: "dm-700"
                                                
                                            }}
                                        >
                                            {promotion.id}
                                        </Typography>
                                        <Tooltip title="Créer une nouvelle classe" placement="left" arrow style={{margin: "auto"}}>
                                            <Button variant="outlined" component={RouterLink} to="/create" className={classes.blue_card} style={{width: "80%", marginLeft: "20px"}}>
                                                <ContentCopy style={{color: "white"}}/>
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                
                            </BaseCard>
                        </Grid>
                        
                        {/* ------------------------- row 2 ------------------------- */}
                        <Grid item xs={12} lg={3}>
                            <BaseCard title="Projets" style={{height: "418px"}}>
                                <List style={{maxHeight: '280px', overflow: "scroll"}}>

                                    {
                                        subjects.map((subject) =>
                                        <div style={{width: "90%"}}><ListItem key={subject.id} style={{fontFamily: "dm-700"}}>{subject.name.split("-")[1]}</ListItem>
                                        <Divider/></div>
                                        )
                                    }
                                </List>
                                <Box display="flex" justifyContent="center">
                                    <Stack direction="column">
                                <Tooltip title="Gérer les projets" placement="left" arrow>
                                    <Button component={RouterLink} to={"/class/" + promotionId + "/projects"} className={classes.blue_card} style={{marginTop: 22, width: "100%"}}>
                                        <Typography style={{color: "white"}}>Gérer les projets</Typography>
                                        <ArrowForward style={{color: "white"}}/>
                                    </Button>
                                </Tooltip>
                                </Stack>
                                </Box>
                            </BaseCard>
                        </Grid>

                        {/* ------------------------- row 2 ------------------------- */}
                        <Grid item xs={12} lg={5}>
                            <BaseCard title="Répartition courante" style={{height: "418px"}}>
                                <Box display="flex" justifyContent="center">
                                <Stack direction="column">
                                    
                                <Box sx={{ border: 3, borderRadius: '10%'}} style={{maxHeight: 280, padding: "10px", marginTop: "20px"}}>
                                <table style={{width: 250, height: 250, backgroundColor: "transparent"}}>
                                    <tbody>
                                        {
                                        groups.map((group, i) =>
                                            <tr key= {group.id}>
                                                {
                                                    subjects.map(subject => {
                                                        return <td style={{backgroundColor: promotion.assignment[i] === subject.id ? "#2ecc71" : "white", borderRadius: "30%", border:"1px black"}} key={subject.id}></td>
                                                    })
                                                }
                                                
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                                </Box>
                                
                                <Tooltip title="Consulter la répartition" placement="left" arrow>
                                    <Button component={RouterLink} to={"/class/" + promotionId + "/pairs"} className={classes.blue_card} style={{marginTop: 7, marginLeft: 25, width: "80%"}}>
                                        <Typography style={{color: "white"}}>Consulter la répartition</Typography>
                                        <ArrowForward style={{color: "white"}}/>
                                    </Button>
                                </Tooltip>
                                </Stack>                 
                                </Box>             
                            </BaseCard>
                        </Grid>

                        {/* ------------------------- row 2 ------------------------- */}
                        <Grid item xs={12} lg={4}>
                            <BaseCard title="Groupes" style={{height: "418px"}}>
                                <List style={{maxHeight: '280px', overflow: "scroll"}}>

                                {
                                    groups.map((group, i) =>
                                    <div style={{width: "90%"}}>
                                    <ListItem key={group.id}>
                                        <Typography style={{fontFamily: "dm-700", paddingRight:100}}>{"Groupe" + (i+1)}</Typography>
                                        {
                                            group.members.map((member) =>
                                                <div  key={member.firstName}>
                                                    <Avatar 
                                                        sx={{ bgcolor: getAvatarColorFromName(member.mail)}}
                                                        style={{marginRight: 3}}
                                                    >
                                                        {(member.firstName[0] + member.lastName[0]).toUpperCase()}
                                                    </Avatar>
                                                </div>
                                                
                                            )
                                        }
                                        
                                    </ListItem>
                                        <Divider/>
                                    </div>
                                    )
                                }
                                </List>
                                <Box display="flex" justifyContent="center">
                                    <Stack direction="column">
                                <Tooltip title="Gérer les groupes" placement="left" arrow>
                                    <Button component={RouterLink} to={"/class/" + promotionId + "/groups"} className={classes.blue_card} style={{marginTop: 22, width: "100%"}}>
                                        <Typography style={{color: "white"}}>Gérer les groupes</Typography>
                                        <ArrowForward style={{color: "white"}}/>
                                    </Button>
                                </Tooltip>
                                </Stack>
                                </Box>
                            </BaseCard>
                        </Grid>

                    </Grid>
            </div>
        );
    else
        return <BufferComponent/>
}

export default AdminPromotionComponent;