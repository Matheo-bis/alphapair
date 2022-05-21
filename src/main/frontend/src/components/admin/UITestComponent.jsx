import { ArrowForward, ContentCopy, DarkMode, Delete, DriveFileRenameOutline, DriveFileRenameOutlineRounded, Home, MoreHoriz, Settings } from '@mui/icons-material';
import { Avatar, AvatarGroup, Breadcrumbs, Button, ButtonGroup, Divider, Fab, Grid, IconButton, Link, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from '../../styles/style';
import BaseCard from '../BaseCard';
import withRouter from '../Router';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

const UITestComponent = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    return ( 
        <div style={{marginTop: 0}}>
            <Grid container>
                <Grid item xs={11} lg={11}>
                    <Breadcrumbs separator=">">
                        <Link component={LinkBehavior} style={{fontFamily: "dm-400"}} underline="hover" color="inherit" href="/home">
                            Classes
                        </Link>
                        <Typography style={{fontFamily: "dm-400"}}>Nom de la classe</Typography>
                    </Breadcrumbs>
                    <Typography style={{fontFamily: "dm-700", fontSize: 40}}>Dashboard</Typography>
                </Grid>
                <Grid item justifyContent="center" xs={1} lg={1}>
                    <Tooltip title="Plus d'actions">
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
                        <MenuItem>
                            <ListItemIcon>
                            <DriveFileRenameOutlineRounded fontSize="small" />
                            </ListItemIcon>
                            Renommer la classe
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                            <Delete color="red" fontSize="small" />
                            </ListItemIcon>
                            <span style={{color: "red"}}>Supprimer la classe</span>
                        </MenuItem>
                        
                    </Menu>
                </Grid>
            </Grid>
                <Grid container spacing={0}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={4} lg={4}>
                        <BaseCard title="Date limite" style={{height: "150px"}}>
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
                        <BaseCard className={classes.white_card} title="Étudiants" style={{height: "150px"}}>
                            <Grid container spacing={3}>
                                <Grid alignContent={"center"} item xs={5}>
                                    <Stack direction="column">
                                        <Typography className={classes.blue_text} style={{fontFamily: "dm-700", fontSize: 80, margin: "auto"}}>22</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={7}>
                                    <Stack direction="column">
                                        <Stack spacing={0} direction="row" style={{margin: "auto"}}>
                                            <AvatarGroup max={5}>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                            </AvatarGroup>
                                            
                                        </Stack>
                                        <Button className={classes.blue_card} variant="contained" style={{padding: 0, marginTop: 5}}>
                                            <RouterLink to="/home" style={{textDecoration: "none", color: "white"}}>Gérer les étudiants</RouterLink>
                                            <IconButton style={{pointerEvents: "none", paddingRight: 0, color: "white"}}>
                                                <ArrowForward/>
                                            </IconButton>
                                        </Button>
                                    </Stack>
                                    
                                </Grid>
                            </Grid>
                            
                        </BaseCard>
                    </Grid>

                    {/* ------------------------- row 1 ------------------------- */}
                    
                    <Grid item xs={3} lg={3}>
                        <BaseCard icon={ContentCopy} className={classes.blue_card} title="Code classe" style={{height: "150px"}} >
                            <Box display="flex" justifyContent="center">
                                <Typography
                                    style={{
                                        color: "white",
                                        fontSize: "4vw",
                                        fontFamily: "dm-700"
                                    }}
                                >
                                    x45J8h
                                </Typography>
                            </Box>
                            
                        </BaseCard>
                    </Grid>
                    
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

export default withRouter(UITestComponent);