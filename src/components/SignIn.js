import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Component } from 'react';
import FormData from "form-data"
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';

 
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SignIn extends Component{

    BackendURL = "https://haciendabackend.herokuapp.com"

    constructor(props){
        super(props);
        this.state = {username:'', password:''};
    }


    login(){
        var body = new FormData();
        body.append("username", this.state.username);
        body.append("pwd", this.state.password);

        axios({
            method: "post",
            url: this.BackendURL+'/per/login',
            data: body,
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
        });
    }

    render(){
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inicio de sesión
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    value={this.state.username}
                    label="Nombre de Usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={this.state.password}
                    autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordar contraseña"
                    />
                    <Button onclick={this.login()}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                    >
                    Iniciar sesión
                    </Button>
                    <Grid container>
                    {/* <Grid item xs>
                        <Link href="#" variant="body2">
                        ¿Olvidó su contraseña?
                        </Link>
                    </Grid> */}
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"¿No se ha registrado? Crear cuenta"}
                        </Link>
                    </Grid>
                    </Grid>
                </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignIn);