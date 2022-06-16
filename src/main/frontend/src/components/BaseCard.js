import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
  Icon,
} from "@mui/material";
import { Groups, LinkedCamera } from "@mui/icons-material";



const BaseCard = (props) => {
  const IconComponent = props.icon;
  const RightComponent = props.rightEl;
  return (
    <Card sx={{border:1}} className={props.className} style={{margin: "10px", borderRadius: "20px", ...props.style}}>
      <Box  p={props.title ? 1.5 : 0} display="flex" alignItems="center" style={{paddingBottom: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
        {
          props.icon != null &&
            <IconComponent style={{marginRight: "10px"}}/>
        }
        {
          props.title !== null &&
          <Typography  style={{fontFamily: "dm-700"}} variant="h6">{props.title}</Typography>
        }
        {
          props.rightEl !== null &&
          props.rightEl
        }
        
      </Box>

      <CardContent style={{paddingTop: 0, paddingBottom: props.title ? 1.5 : 0}}>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
