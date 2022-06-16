import { GroupAdd, GroupRemove, Groups, Help, Lock, LockOpen } from '@mui/icons-material';
import { Alert, Avatar, Breadcrumbs, CardContent, Grid, IconButton, Link, Snackbar, Tooltip, Typography } from '@mui/material';
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import GroupService from '../../services/GroupService';
import Protocol from '../../services/Protocol';
import UserService from '../../services/UserService';
import { getAvatarColorFromName } from '../../styles/style';
import AlphapairButton from '../AlphapairButton';
import BaseCard from '../BaseCard';
import BufferComponent from '../BufferComponent';
import withRouter from '../Router';

const LinkBehavior = React.forwardRef((props, ref) => {
    return <RouterLink ref={ref} to={props.href} {...props} />
});

class AdminPromotionGroupsComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            promotionId: this.props.params.id,
            groups: [],
            user: null,
            remainingRequests: 2,
            open: {group: 0, action: 0} // action 1 : enter a group, action 2 : leave a group, action 3 : lock, action 4 : unlock
        }
    }

    componentDidMount() {
        GroupService.getPromotionGroups(
            this.state.promotionId,
            (res) => this.setState({
                groups: res.groups,
                remainingRequests: this.state.remainingRequests - 1
            })
        )

        UserService.userGetSelf(
            null,
            (res) => {
                console.log(res);
                this.setState({
                user: res,
                remainingRequests: this.state.remainingRequests - 1
                })}
            );
        
    }

    handleJoinGroup = (groupId, index) => {
        UserService.userUpdateGroup(
            {
                groupId: groupId
            },
            () => {
                

                // in case of success, update groups state variable
                let groups = this.state.groups.slice();
                let user = this.state.user;
                user.groupId = groupId;
                

                // removing the user from its previous group (if any)
                groups.forEach(group => {
                    group.members = group.members.filter(member => member.mail !== this.state.user.mail)
                });

                if (groupId !== "") {
                    this.setState({open: {group: index + 1, action: 1}});
                    // adding the user to its new group
                    console.log("user to be added : ");
                    console.log(user);

                    groups[index].members.push(
                        {
                            mail: user.mail,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    )                    
                    groups[index].members.sort((u1, u2) => (u1.name > u2.name) ? 1 :( (u1.name < u2.name) ? -1 : 0));
                } else {
                    this.setState({open: {group: index + 1, action: 2}});
                }

                this.setState({
                    groups: groups,
                    user: user
                });
            }
        )
    }

    handleSetGroupLocked = (groupId, isLocked, index) => {
        

        let body = {
            groupId: groupId,
            isLocked: {
                isLocked: isLocked
            }
        }
        GroupService.setGroupLocked(
            body,
            () => {


                let groups = this.state.groups.slice();

                groups[index].isLocked = isLocked;

                this.setState({
                    groups: groups,
                    open: {group: index + 1, action: isLocked ? 3 : 4}
                });
            }
        )
    }

    isGroupLockedById(id) {
        for (let i = 0 ; i < this.state.groups.length ; i++) {
            if (this.state.groups[i].id === id) {
                return this.state.groups[i].isLocked;
            }
        }
        return false;
    }

    render() {
        if (this.state.remainingRequests === 0) {
          return (
            <div>
                <Grid container>
                    <Grid item xs={11} lg={11}>
                        <Breadcrumbs separator=">">
                            <Link component={LinkBehavior} underline="hover" color="inherit" href="/home">
                                Accueil
                            </Link>
                            <Typography>{"Groupes"}</Typography>
                        </Breadcrumbs>
                        <Typography style={{fontFamily: "dm-700", fontSize: 30}}>Liste des groupes</Typography>
                    </Grid>
            
                    <Grid container spacing={0}>
                        {
                            this.state.groups.map((group, index) => 
                            <Grid key={group.id} item xs={12} lg={4}>
                                <BaseCard 
                                    rightEl={
                                            
                                            group.members.map(member => member.mail).includes(this.state.user.mail) ?
                                            <span key={group.id}>
                                            <Tooltip title={group.isLocked ? "Déverouiller le groupe" : "Verrouiller le groupe"}>
                                            <IconButton style={{marginLeft: "0"}} onClick={group.isLocked ?
                                                () => this.handleSetGroupLocked(group.id, false, index) :
                                                () => this.handleSetGroupLocked(group.id, true, index)
                                                }
                                            >
                                              {
                                                  group.isLocked ?
                                                  <Lock/> :
                                                  <LockOpen/>
                                              }
                                              
                                            </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Un groupe verouillé empêche quiconque de rentrer ou de sortir du groupe. Cela permet d'éviter qu'un élève malveillant ne sabote les vœux des autres groupes.">
                                            <Help></Help>
                                            </Tooltip>
                                            </span>
                                            : <IconButton style={{pointerEvents: "none"}}><Lock style={{visibility: "hidden", }}></Lock></IconButton>
                                    } 
                                    icon={Groups}
                                    title={"Groupe " + (index + 1)}
                                    style={{height: "200px"}}
                                >
                                    <CardContent>
                                        <div style={{height: "100px"}}>
                                            {
                                                group.members.map((member, member_index) =>
                                                <div style={{display: "flex", marginTop: 10}}>
                                                    <Avatar 
                                                        sx={{ bgcolor: getAvatarColorFromName(member.firstName)}}
                                                        style={{fontFamily: "dm-400"}}
                                                    >
                                                        {(member.firstName[0] + member.lastName[0]).toUpperCase()}
                                                    </Avatar>
                                                    <Typography key={member.mail} style={{marginTop: 10, marginLeft: 10, fontFamily: "dm-700", textOverflow: "ellipsis", color: member.mail === this.state.user.mail ? "#5865F2" : ""}}>
                                                        {member.firstName + " " + member.lastName}
                                                    </Typography>
                                                </div>
                                                )

                                            }
                                        </div>
                                        
                                    </CardContent>
                                </BaseCard>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </div>
            
        ) }
        else return <BufferComponent/>
    }
}

export default withRouter(AdminPromotionGroupsComponent);