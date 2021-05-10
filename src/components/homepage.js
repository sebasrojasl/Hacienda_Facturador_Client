import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../images/flex2.png";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';




const secondStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${logo})`, 
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'center',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  margin: {
    margin: theme.spacing(1),
    alignItems: 'center',
  },

}));

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


export default function SignInSide() {
  const classes = secondStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
    <Grid item xs={false} sm={4} md={6} className={classes.image} />
    <Grid item xs={12} sm={8} md={6} component={Paper}  square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Facturador Hacienda
          </Typography>
          <form className={classes.form} noValidate>
            <Button 
              component={ Link } to="/factura"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.submit}
            >
              Emisión de la factura Electrónica
            </Button>
            <Button 
            component={ Link } to="/factura"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<DescriptionIcon />}
              className={classes.submit}
            >
              Declaración Jurada
            </Button>
            <Button 
            component={ Link } to="/visualizador"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<DescriptionIcon />}
              className={classes.submit}
            >
              Visualizador de facturas
            </Button>
          </form>
        </div>
      </Grid>

  </Grid>
  
  );
}