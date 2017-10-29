import React from 'react'
import {Button, Card, CardActions, CardContent, Grid, IconButton, TextField, Typography, withStyles} from "material-ui";
import './login.css'
import logo from './mtel.png'
import outlook_logo from './outlook-logo.png'
import {login} from "./webApi/api";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUser} from './actions'

const style = theme => ({
    container:{
        width: "100%",
        maxWidth: 350
    },
    input: {
        width: "100%"
    },
    logo: {
        height: 50
    },
    outlookImg: {
        width: "100%",
        height: "100%"
    },
    flexCenter:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    outlookBtn:{
        position: "relative",
        top: 5,
        marginLeft: 10
    }
});
class Login extends React.Component {

    state = {username: "", password: ""};

    componentDidMount(){
        if(localStorage.getItem("token") != null) this.props.history.push("/dashboard");
    }

    handleChange = key => (event) => {
        this.setState({
            [key]: event.target.value,
        });
    };

    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        login(this.state.username, this.state.password).then(res => {
            localStorage.setItem("token", res.token);
            delete res.token;
            this.props.setUser(res);
            this.props.history.push("/dashboard")
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <form className="login-container" onSubmit={(e) => this.onSubmit(e)}>
                <Card className={classes.container}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} className={classes.flexCenter}>
                                <img src={logo} alt="" className={classes.logo}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center">Support dashboard</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography type="display1" align="center">Login</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    label="Username"
                                    value={this.state.username}
                                    className={classes.input}
                                    onChange={this.handleChange('username')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    label="Password"
                                    value={this.state.password}
                                    className={classes.input}
                                    onChange={this.handleChange('password')}
                                    margin="normal"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.flexCenter}>
                        <Button raised color="accent" type="submit">Login</Button>
                        <IconButton className={classes.outlookBtn}>
                            <img src={outlook_logo} alt="Login with outlook" className={classes.outlookImg}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </form>
        )
    }
}
function mapState(state) {
    return {
        user: state.user
    }
}
function mapDispatch(dispatch) {
    return bindActionCreators({setUser}, dispatch);
}
export default connect(mapState,mapDispatch)(withStyles(style)(Login));