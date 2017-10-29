import React, {Component} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from "material-ui";
import Chat from "./Chat";
import Sidebar  from './Sidebar'

const style = theme => ({
    flex: {
        flex: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100vh',
    },
    appBar: {
        width: '100%',
        position: 'relative'
    }
});

class App extends Component {
    componentDidMount(){
        if(!localStorage.getItem("token")){
            this.props.history.push("/login");
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.appFrame}>
                <Sidebar/>
                <div className={classes.appBar}>
                    <AppBar className={classes.appBar}>
                        <Toolbar color={"red"}>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                m:support
                            </Typography>
                            <Button color="contrast" onClick={()=>this.onLogout()}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <Chat/>
                </div>
            </div>
        );
    }

    onLogout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
}

export default withStyles(style)(App);
