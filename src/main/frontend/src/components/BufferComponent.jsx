import { CircularProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';

class BufferComponent extends Component {
    render() {
        return (
            <Stack alignItems="center">
                <CircularProgress size={50} style={{marginTop: "20%"}}/>
            </Stack>
            
        );
    }
}

export default BufferComponent;