import React from 'react'
import {
    Divider, Drawer, Icon, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography,
    withStyles
} from "material-ui";
import {getTicketList, resolveTicket} from "../webApi/api";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setActiveTicket} from "../actions";
import './style.css'
import CheckIcon from 'material-ui-icons/Check'
import LockIcon from 'material-ui-icons/Lock'
import logo from '../mtel.png'

const style = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 320,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64
    },
    unseen: {
        marginRight: 0
    }
});

class Sidebar extends React.Component {

    timeout;

    state = {tickets: []};

    componentDidMount() {
        this.timeout = setInterval(() => {
            getTicketList().then(res => {
                this.setState({tickets: res});
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {classes} = this.props;
        return (
            <Drawer
                type="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <img src={logo} alt="" style={{height: '50px', maxWidth: '100%', marginRight: 25}}/>
                    <Typography type="title">Support center</Typography>
                </div>
                <Divider/>
                <List>
                    {this.state.tickets.map((ticket) => (
                        <ListItem button key={ticket.id}>
                            <ListItemIcon>
                                {ticket.timestamp_resolved ? <LockIcon/> :
                                    <Typography type="title" align="center" className={classes.unseen}>
                                        {ticket.unseen_kam}
                                    </Typography>}
                            </ListItemIcon>
                            <ListItemText primary={ticket.title} secondary={ticket.author.username}
                                          onClick={() => this.changeTicket(ticket)}/>
                            {this.props.user.is_staff ?
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Mark as resolved"
                                                title="Mark as resolved"
                                                onClick={() => this.markResolved(ticket)}>
                                        <CheckIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction> : null}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        )
    }

    changeTicket(ticket) {
        this.props.setActiveTicket(ticket);
    }

    markResolved(ticket) {
        resolveTicket(ticket.id).then(res => {
        });
    }
}

function mapState(state) {
    return {
        ticket: state.ticket,
        user: state.user
    }
}

function mapDispatch(dispatch) {
    return bindActionCreators({setActiveTicket}, dispatch);
}

export default connect(mapState, mapDispatch)(withStyles(style)(Sidebar))