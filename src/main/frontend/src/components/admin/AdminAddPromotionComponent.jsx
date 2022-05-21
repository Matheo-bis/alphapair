import { Button, FormControlLabel, Radio, RadioGroup, Step, StepButton, Stepper, TextField } from '@mui/material';
import React, { Component } from 'react';
import PromotionService from '../../services/PromotionService';
import withRouter from '../Router';


class AdminAddPromotionComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            limitDate: "",
            isStudentEditable: null,
            subjects: [],

            // consts
            steps: ['Entrer les informations générales', 'Ajouter les sujets', 'Partager la classe aux étudiants'],
            totalSteps: 3,
            currentStep: 0
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handlelimitDateChange = (event) => {
        this.setState({limitDate: event.target.value + ":00"});
    }
    handleisStudentEditableChange = (event) => {
        this.setState({isStudentEditable: event.target.value === "yes" ? true : false});
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let subjects = []
        for (let i = 0 ; i < 3 ; i++) {
            subjects.push({
                name: `Subject${i}`,
                professor: `Professor${i}`,
                description: `Description${i}`
            })
        }

        const promotion = {
            name: this.state.name,
            limitDate: this.state.limitDate,
            isStudentEditable: this.state.isStudentEditable,
            subjects : subjects
        };

        PromotionService.addPromotion(
            promotion,
            (res) => window.location = "/class/" + res
        );
    }

    render() {
        let date = new Date();
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <Stepper nonLinear activeStep={0}>
                            {
                                this.state.steps.map(step =>
                                    <Step key={step}>
                                        <StepButton color="inherit">
                                            {step}
                                        </StepButton>
                                    </Step>
                                )
                            }
                        </Stepper>
                        <div className="card col-md-10 offset-md-1">
                            <h1 className="text-center">Créer une nouvelle classe</h1>
                            <div className="card col-md-6 offset-md-3">
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>  
                                        <div className="form-group">
                                            <TextField required={true} className="form-control" label="Nom de la classe" variant="outlined" id="name" name="name" onChange={this.handleNameChange}/>
                                            <TextField
                                                id="limitDate" name="limitDate"
                                                label="Date limite"
                                                type="datetime-local"
                                                defaultValue={date.toISOString().slice(0,10)+"T"+date.toLocaleTimeString().slice(0,5)}
                                                sx={{ width: "100%", marginTop: "10px" }}
                                                onChange={this.handlelimitDateChange}
                                            />
                                            <span>Autoriser les élèves à lancer une répartition ?</span>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                defaultValue="no"
                                                onChange={this.handleisStudentEditableChange}
                                            >
                                                <FormControlLabel value="no" control={<Radio />} label="Non" />
                                                <FormControlLabel value="yes" control={<Radio />} label="Oui" />
                                            </RadioGroup>
                                        </div>
                                        <Button style={{float: "left"}} variant="outlined" onClick={() => {this.cancel();}}>Annuler</Button>
                                        <Button id="createProjectSubmit" style={{float: "right"}} variant="contained" onClick={this.handleSubmit}>Suivant</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminAddPromotionComponent);