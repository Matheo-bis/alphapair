import { Button } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { styles } from '../styles/style';

const useStyles = makeStyles(styles);

function AlphapairButton(props) {
    const classes = useStyles();

    return (
        <Button
            className={classes.blue_card}
            onClick={props.onClick}
            variant={props.variant}
            disabled={props.disabled}
            style={{color: "white", fontFamily: "dm-400", ...props.style}}
        >
            {props.children}
        </Button>
    );
}

export default AlphapairButton;