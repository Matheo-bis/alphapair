import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import UserService from '../../services/UserService';
import { styles } from '../../styles/style';
import BufferComponent from '../BufferComponent';

const useStyles = makeStyles(styles);

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

function StudentHomeComponent(props) {
    const classes = useStyles();

    const [user, setUser] = useState({})    
    
    const [remaining, setRemaining] = useState(1);

    function requestOk() {setRemaining((remaining) => remaining - 1);}

    useEffect(() => {
      
        UserService.userGetSelf(
            null,
            function(res) {
                setUser(res);
                requestOk();
            }
        );
    }, [])

    if (remaining === 0) {

        return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>{"Bonjour, Administrateur."}</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    } else
        return <BufferComponent/>
}

export default StudentHomeComponent;