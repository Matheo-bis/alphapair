import { Lock, LockOpen } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import React, { Component } from 'react';
import GroupService from '../../services/GroupService';
import Protocol from '../../services/Protocol';
import UserService from '../../services/UserService';
import BufferComponent from '../BufferComponent';
import withRouter from '../Router';

class StudentGroupsComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            user: null,
            remainingRequests: 2
        }
    }

    componentDidMount() {
        GroupService.getPromotionGroups(
            Protocol.UNKNOWN_ID,
            (res) => this.setState({
                groups: res.groups,
                remainingRequests: this.state.remainingRequests - 1
            })
        )

        UserService.userGetSelf(
            null,
            (res) => this.setState({
                user: res,
                remainingRequests: this.state.remainingRequests - 1
            })
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
                    // adding the user to its new group
                    groups[index].members.push(
                        {
                            mail: this.state.user.mail,
                            name: `${this.state.user.lastName} ${this.state.user.firstName}`
                        }
                    )
                    
                    groups[index].members.sort((u1, u2) => (u1.name > u2.name) ? 1 :( (u1.name < u2.name) ? -1 : 0));
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
                    groups: groups
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
        if (this.state.remainingRequests === 0)
          return (
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                
                
                
                style={{margin:"auto"}}
            >
                {
                    this.state.groups.map((group, index) =>
                        <Card key={group.id} style={{height: "200px", width: "250px", margin: "5px"}}>
                            <CardHeader
                                title={`Groupe ${index + 1}`}
                                action={
                                    group.members.map(member => member.mail).includes(this.state.user.mail) ?
                                    <IconButton onClick={group.isLocked ?
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
                                    : null
                                  }
                            />
                            <CardContent>
                                {
                                    group.members.map(member =>
                                        <Typography key={member.mail}>
                                            {member.name}
                                        </Typography>
                                    )

                                }
                                {
                                    group.members.map(member => member.mail).includes(this.state.user.mail) ?
                                    <Button disabled={group.isLocked} variant="outlined" onClick={() => this.handleJoinGroup("", index)}>Quitter le groupe</Button> :
                                    <Button disabled={group.isLocked || (this.state.user.groupId !== "" && this.isGroupLockedById(this.state.user.groupId))} variant="outlined" onClick={() => this.handleJoinGroup(group.id, index)}>Rejoindre ce groupe</Button>
                                }
                                {/*<Button variant="outlined" onClick={() => this.handleJoinGroup(group.id, index)}>Rejoindre ce groupe</Button>*/}
                            </CardContent>
                        </Card>    
                    )
                }
            </Grid>
        )
        else return <BufferComponent/>
    }
}

export default withRouter(StudentGroupsComponent);