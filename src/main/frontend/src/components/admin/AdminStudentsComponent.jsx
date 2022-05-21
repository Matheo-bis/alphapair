import { Home } from '@mui/icons-material';
import { Avatar, AvatarGroup, Button, ButtonGroup, Fab, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import BaseCard from '../BaseCard';
import withRouter from '../Router';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    blue_card: {
        backgroundColor: "#5865F2"
    },
    in: {
      padding: 8
    }
  }));

class AdminStudentsComponent extends Component {

    render() {
        //const classes = useStyles();
        return (
            <div>
                Admin list of all students on the app
                <Grid container spacing={0}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={4} lg={4}>
                        <BaseCard title="Date limite">
                        <Stack spacing={2} direction="row">
                            <Button color="primary">Text</Button>
                            <Button color="error">Text</Button>
                            <Button color="secondary">Text</Button>
                            <Button color="success">Text</Button>
                            <Button color="warning">Text</Button>
                        </Stack>
                        </BaseCard>
                    </Grid>

                    <Grid item xs={5} lg={5}>
                        <BaseCard title="Étudiants" style={{height: "150px"}}>
                            <Stack spacing={0} direction="row" style={{margin: "auto"}}>
                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                            </Stack>
                        </BaseCard>
                    </Grid>

                    {/* ------------------------- row 1 ------------------------- */}
                    <StyledEngineProvider injectFirst>
                    <Grid item xs={3} lg={3}>
                        <BaseCard title="Code classe" style={{height: "150px"}} >
                            <Typography style={{color: "white", fontSize: "30px", marginLeft:"50%"}}>x45J8h</Typography>
                        </BaseCard>
                    </Grid>
                    </StyledEngineProvider>
                    
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Outline Buttons">
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" color="primary">
                            outlined
                            </Button>
                            <Button variant="outlined" color="error">
                            outlined
                            </Button>
                            <Button variant="outlined" color="secondary">
                            outlined
                            </Button>
                            <Button variant="outlined" color="success">
                            outlined
                            </Button>
                            <Button variant="outlined" color="warning">
                            outlined
                            </Button>
                        </Stack>
                        </BaseCard>
                    </Grid>

                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Size Buttons">
                        <Box sx={{ "& button": { mx: 1 } }}>
                            <Button color="primary" size="small" variant="contained">
                            small
                            </Button>
                            <Button color="error" size="medium" variant="contained">
                            medium
                            </Button>
                            <Button color="secondary" size="large" variant="contained">
                            large
                            </Button>
                        </Box>
                        </BaseCard>
                    </Grid>

                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Icon Buttons">
                        <Stack spacing={2} direction="row">
                            <IconButton aria-label="delete" color="success">
                            <Home />
                            </IconButton>
                            <IconButton aria-label="delete" color="error">
                            <Home />
                            </IconButton>
                            <IconButton aria-label="user" color="warning">
                            <Home />
                            </IconButton>
                        </Stack>
                        </BaseCard>
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Fab Buttons">
                        <Stack spacing={2} direction="row">
                            <Fab color="primary" aria-label="add">
                            <Home />
                            </Fab>
                            <Fab color="secondary" aria-label="add">
                            <Home />
                            </Fab>
                            <Fab color="secondary" disabled aria-label="add">
                            <Home />
                            </Fab>
                        </Stack>
                        </BaseCard>
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Group Buttons">
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                        >
                            <Button>One</Button>
                            <Button>Two</Button>
                            <Button>Three</Button>
                        </ButtonGroup>
                        </BaseCard>
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <BaseCard title="Group Outline Buttons">
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button>One</Button>
                            <Button>Two</Button>
                            <Button>Three</Button>
                        </ButtonGroup>
                        </BaseCard>
                    </Grid>
                    </Grid>
            </div>
        );
    }
}

export default withRouter(AdminStudentsComponent);