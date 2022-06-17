import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Grid, Link, List, ListItem, ListItemText, Radio, RadioGroup, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from '../../styles/style';
import BaseCard from '../BaseCard';
import AlphapairButton from '../AlphapairButton';
import { Add } from '@mui/icons-material';
import PromotionService from '../../services/PromotionService';

const steps = [
    "Informations générales",
    "Ajouter les projets",
    "Récapitulatif"
]

//var pName = "", pProf = "", pDesc = "";

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

const date = new Date();

function AdminAddPromotionComponent(props) {
    const classes = useStyles();

    const [currentStep, setCurrentStep] = useState(0);
    const [maxStep, setMaxStep] = useState(2);

    const [open, setOpen] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    
    const [name, setName] = useState("");
    const [limitDate, setLimitDate] = useState("");
    const [isStudentEditable, setIsStudentEditable] = useState(false);

    const [projects, setProjects] = useState([]);
    const [pName, setPName] = useState("");
    const [pProf, setPProf] = useState("");
    const [pDesc, setPDesc] = useState("");
    const [formErrorName, setFormErrorName] = useState(false);
    const [formErrorProf, setFormErrorProf] = useState(false);

    const submit = (e) => {
        console.log("submitting data ...");
        e.preventDefault();

        const promotion = {
            name: name,
            limitDate: limitDate,
            isStudentEditable: isStudentEditable,
            subjects : projects
        };

        PromotionService.addPromotion(
            promotion,
            (res) => window.location = "/class/" + res
        );
    }

    const handleProjectAdd = () => {
        let foundErrors = false;
        if (pName === "" || pName.includes("-")) {
            setFormErrorName(true);
            foundErrors = true;
        } else if (formErrorName) {
            setFormErrorName(false);
        }
        if (pProf === "") {
            setFormErrorProf(true);
            foundErrors = true;
        } else if (formErrorProf) {
            setFormErrorProf(false);
        }

        if (foundErrors) return;
        handleCloseAdd();

        let newProject = {
            id: Math.random().toString(),
            name: pName,
            professor: pProf,
            description: pDesc
        };
        console.log(newProject);
        setProjects(projects => [...projects, newProject]);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
        setOpen(0);
        setFormErrorName(false);
        setFormErrorProf(false);
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={11} lg={11}>
                    <Breadcrumbs separator=">">
                        <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                            Accueil
                        </Link>
                        <Typography>{"Créer"}</Typography>
                    </Breadcrumbs>
                    <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Créer une nouvelle classe</Typography>
                </Grid>
                
                
                
                <Grid item xs={12} style={{marginTop: 10}}>
                    <Stepper activeStep={currentStep} style={{margin:"auto", marginBottom: 30, width:"60%"}}>
                        {
                            steps.map((step, index) => {
                                return <Step key={step}><StepLabel>{step}</StepLabel></Step>
                            })
                        }

                    </Stepper>
                    <BaseCard style={{width: "70%", margin:"auto"}} title={steps[currentStep]}>
                    
                    {
                        currentStep === 0 &&
                        <Stack direction="column">
                            <div style={{margin:"auto"}} className="form-group">
                                <span style={{margin:"auto", display: "flex", fontFamily:"dm-700"}}>Nom de la classe</span>
                                <TextField value={name} required={true} className="form-control" label="Nom de la classe" variant="outlined" id="name" name="name" onChange={(e) => setName(e.target.value)}/>
                                <span style={{margin:"auto", display: "flex", fontFamily:"dm-700"}}>Date limite de la classe</span>
                                <TextField
                                    value={limitDate}
                                    id="limitDate"
                                    type="datetime-local"
                                    sx={{ width: "100%", marginTop: "10px" }}
                                    onChange={(e) => {setLimitDate(e.target.value); console.log(e.target.value)}}
                                />
                                <span style={{margin:"auto", display: "flex", fontFamily:"dm-700"}}>Autoriser les élèves à lancer une répartition ?</span>
                                <RadioGroup
                                    row
                                    value = {isStudentEditable ? "yes" : "no"}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(e) => setIsStudentEditable(e.target.value==="yes")}
                                >
                                    <FormControlLabel value="no" control={<Radio />} label="Non" />
                                    <FormControlLabel value="yes" control={<Radio />} label="Oui" />
                                </RadioGroup>
                            </div>
                        </Stack>
                    }
                    {
                        currentStep === 1 &&
                        <Stack direction="column">
                            {
                                projects.length > 0 ?
                                <BaseCard title="Sujets créés" style={{maxHeight: 200, overflow: "scroll"}}>
                                    <List>                                    
                                        {
                                            projects.map((p, i) =>
                                            <div key={p.id}>
                                                <ListItem key={p.id}>
                                                    <ListItemText
                                                        primary={<Button className={classes.title_link} onClick={() => setOpen(i+1)} style={{textDecoration: "none"}}>
                                                            <span className={classes.title_link} style={{fontFamily: "dm-700", color: "black"}}>{p.name}</span>
                                                        </Button>}
                                                        secondary={<span style={{fontStyle: "italic"}}>{"Professeur encadrant : " + p.professor}</span>}
                                                    />
                                                    <Dialog open={open === i+1} onClose={() => setOpen(0)}>
                                                        <DialogTitle style={{fontFamily: "dm-700"}}>{p.name}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Professeur encadrant : {p.professor}
                                                            </DialogContentText>
                                                            <DialogContentText>
                                                                Description du projet : {p.description == "" ? "Aucune description fournie" : p.description}
                                                            </DialogContentText>
                                                        </DialogContent>
                                                    </Dialog>
                                                </ListItem>
                                                
                                                    
                                                {
                                                    (i < projects.length - 1) && <Divider style={{height: 1}}/>
                                                }
                                                
                                            </div>
                                            )
                                        }
                                    </List>
                                </BaseCard> : <span>Aucun projet ajouté.</span>
                            }
                            
                            <AlphapairButton
                                style={{width:"40%", margin:"auto"}}
                                onClick={() => {
                                    setOpenAdd(true);
                                    setOpen(0);
                                }}
                            >
                                <span>Ajouter un nouveau projet</span>
                                <Add/>
                            </AlphapairButton>

                            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
                                <DialogTitle style={{fontFamily: "dm-700"}}>Ajouter un nouveau projet</DialogTitle>

                                <DialogContent>
                                    <DialogContentText style={{fontFamily: "dm-700"}}>
                                        Entrez le nom du projet :
                                    </DialogContentText>
                                    <TextField
                                        style={{marginBottom: 30}}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Nom du projet"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setPName(e.target.value)}
                                        error = {formErrorName}
                                        helperText={formErrorName ? "Le nom du projet est invalide !" : ""}
                                    />
                                     <DialogContentText style={{fontFamily: "dm-700"}}>
                                        Entrez le professeur référent du projet :
                                    </DialogContentText>
                                    <TextField
                                        style={{marginBottom: 30}}
                                        margin="dense"
                                        id="prof"
                                        label="Professeur référent du projet"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setPProf(e.target.value)}
                                        error = {formErrorProf}
                                        helperText={formErrorProf ? "Le nom du professeur référent ne peut être vide !" : ""}
                                    />
                                     <DialogContentText style={{fontFamily: "dm-700"}}>
                                        Entrez une description pour le projet (facultatif) :
                                    </DialogContentText>
                                    <TextField
                                        style={{marginBottom: 30}}
                                        margin="dense"
                                        id="desc"
                                        label="Description du projet"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setPDesc(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseAdd}>Annuler</Button>
                                    <Button onClick={handleProjectAdd}>Ajouter un projet</Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    }
                    {
                        currentStep === 2 &&
                        <Stack direction="column">
                            {name === "" ?
                                <div style={{margin: "auto", color:"red"}}>Le nom de la classe n'est pas défini</div>
                            : <div style={{margin: "auto", color:"green"}}>Le nom de la classe est : {name}</div>} 
                            {limitDate === "" ?
                                <div style={{margin: "auto", color:"red"}}>La date limite de la classe n'est pas définie</div>
                            : <div style={{margin: "auto", color:"green"}}>La date limite de la classe est : {limitDate}</div>}

                            <div style={{margin: "auto"}}>La répartition par les élèves est {isStudentEditable ? "" : "dés"}activée</div>

                            <div style={{margin: "auto"}}>{projects.length} projet{projects.length > 1 ? "s" : ""} ajouté{projects.length > 1 ? "s" : ""} dans cette classe</div>

                            <div style={{margin: "auto", fontFamily: "dm-700"}}>Après avoir créé cette classe, vous ne pourrez plus ajouter ou supprimer de projets. Vous pourrez cependant modifier leurs propriérés. Poursuivre ?</div>
                        </Stack>
                    }

                    
                    <div style={{marginLeft: "50%", right:0}}>
                        <Button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep===0}
                        >
                            Retour
                        </Button>
                        <Button
                            onClick={currentStep === maxStep ? (e) => submit(e) :
                                () => setCurrentStep(currentStep + 1)}
                            disabled={  (currentStep === 1 && projects.length === 0) ||
                                (currentStep === 2 && (projects.length === 0 || name === "" || limitDate === ""))}
                        >
                            {currentStep === maxStep ? "Créer la classe" : "Suivant"}
                        </Button>
                    </div>
                    </BaseCard>
                    
                </Grid>
            </Grid>
        </div>

    );
}

export default AdminAddPromotionComponent;