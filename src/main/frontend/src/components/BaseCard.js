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



const BaseCard = (props) => {
  const IconComponent = props.icon;
  return (
    <Card className={props.className} style={{margin: "10px", borderRadius: "20px", ...props.style}}>
      <Box p={1.5} display="flex" alignItems="center" style={{paddingBottom: 0}}>
        <Typography  style={{fontFamily: "dm-700"}} variant="h6">{props.title}</Typography>
        {
          props.icon != null &&
          <Icon style={{marginLeft: "auto", height: "auto"}}>
            <IconComponent/>
          </Icon>
        }
      </Box>
      <CardContent style={{paddingTop: 0}}>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
