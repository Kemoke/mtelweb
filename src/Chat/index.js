import React from 'react'
import './style.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTicket, sendMessage} from "../webApi/api";
import {Card, CardContent, Paper, TextField, Typography, withStyles} from "material-ui";
import 'simplebar/dist/simplebar'
import 'simplebar/dist/simplebar.css'

const style = theme => ({
    messageContainer: {
        padding: 10,
        display: 'flex',
        alignItems: 'center'
    },
    messageBox: {
        flex: 1,
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 64px)'
    },
    message: {
        display: 'flex',
        padding: 10
    },
    messageDaySeparator: {
        display: 'flex',
        alignItems: 'center',
    },
    separator: {
        flex: 1,
        height: 1,
        background: 'gray'
    }
});

function padDigits(number, digits) {
    return new Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

class Chat extends React.Component {

    timeout;

    state = {chat: []};

    componentDidMount() {
        this.timeout = setInterval(() => {
            if (this.props.ticket.id === undefined) return;
            getTicket(this.props.ticket.id).then(res => {
                console.log(res);
                this.setState({chat: res.message_set});
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    onSubmit(e) {
        e.preventDefault();
        sendMessage(this.props.ticket.id, this.state.message).then(data => {});
        this.setState({message: ''});
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.chatContainer}>
                <div style={{flex: 1, overflowY: 'scroll'}}>
                    {this.state.chat.map((message, i) => {
                        const timestamp = new Date(message.timestamp);
                        let changeDay = false;
                        if (i == 0) changeDay = true;
                        else {
                            const prevStamp = new Date(this.state.chat[i - 1].timestamp);
                            if (timestamp.getDay() != prevStamp.getDay()) changeDay = true;
                        }
                        const imgRegex = new RegExp("<img>(.+)</img>");
                        let mesg = message.content;
                        if (imgRegex.test(message.content)) {
                            mesg = mesg.replace(imgRegex, "<img style='width: 100%' src='$1'>")
                        }
                        const msg = (
                            <div key={message.id} className={classes.message}>
                                <div
                                    style={{marginRight: 10}}>{padDigits(timestamp.getHours(), 2)}:{padDigits(timestamp.getMinutes(), 2)}</div>
                                <div
                                    style={{marginRight: 10}}>{message.sender.first_name + " " + message.sender.last_name}</div>
                                <div style={{maxWidth: '90%'}} dangerouslySetInnerHTML={{__html: mesg}}/>
                            </div>
                        );
                        let dateDivider = null;
                        if (changeDay) {
                            dateDivider = (
                                <div key={1000 + message.id} className={classes.messageDaySeparator}>
                                    <div className={classes.separator}/>
                                    <div style={{
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}>{timestamp.toLocaleDateString()}</div>
                                    <div className={classes.separator}/>
                                </div>
                            )
                        }
                        return [dateDivider, msg];
                    })}
                </div>
                {this.props.ticket.timestamp_resolved ? null :
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <Paper className={classes.messageContainer}>
                            <TextField
                                id="name"
                                label="Message"
                                className={classes.messageBox}
                                value={this.state.message}
                                onChange={this.handleChange('message')}
                                margin="normal"
                            />
                        </Paper>
                    </form>}
            </div>
        )
    }

    handleChange = key => (event) => {
        this.setState({
            [key]: event.target.value,
        });
    };
}

function mapState(state) {
    return {
        ticket: state.ticket
    }
}

function mapDispatch(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapState, mapDispatch)(withStyles(style)(Chat))