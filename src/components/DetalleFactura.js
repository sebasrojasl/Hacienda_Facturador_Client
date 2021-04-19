import React  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../images/detalleFactura.jpg";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'bootstrap/dist/css/bootstrap.min.css';

const  act_e= [{label:'Código vendedor'}, {label:'Código comprador'}, {label:'Assignado por la industria'}, {label:'Uso interno'} , {label:'Otros'}];



const useStyles = makeStyles((theme) => ({
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
    alignItems: 'center'
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

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
    <Grid item xs={false} sm={4} md={6} className={classes.image} />
    <Grid item xs={12} sm={8} md={6} component={Paper}  square>
        <div className={classes.paper}>

          <Autocomplete
          id="idtype_combobox"
           options={act_e}
            getOptionLabel={(option) => option.label}
             style={{ width: 400 }}
             renderInput={(params) => <TextField {...params} label="Tipo de código" variant="outlined" />}
             />


          <TextField
            required
            id="idProduct"
            label="Código"
            style={{ margin: 8 }}
            margin="normal"
            fullWidth
            autoComplete="Código"
          />
          <TextField
            required
            id="descriptionProduct"
            label="Descripción"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            
            autoComplete="Descripción"
          />
          <Autocomplete
          id="idtype_combobox"
           options={act_e}
            getOptionLabel={(option) => option.label}
             style={{ width: 400 }}
             renderInput={(params) => <TextField {...params} label="Unidad de medida" variant="outlined" />}
             />


          <form className={classes.form} noValidate>
          </form>
        </div>
      </Grid>
  </Grid>
  
  );
}