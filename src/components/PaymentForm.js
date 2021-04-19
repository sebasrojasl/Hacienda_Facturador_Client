import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const  act_e= [{label:'DIMEX'}, {label:'NITE'}, {label:'DIDI'}, {label:'Físico Nacional'}, {label:'Pasaporte'}, {label:'Juridica Nacional'}];


export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos del receptor
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <Autocomplete
          id="idtype_combobox"
           options={act_e}
            getOptionLabel={(option) => option.label}
             style={{ width: 250 }}
             renderInput={(params) => <TextField {...params} label="Tipo de Identificación" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="idnumber"
            label="Número de identificación"
            fullWidth
            autoComplete="Número de identificación"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="name_receptor" label="Nombre" fullWidth autoComplete="name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email_receptor"
            label="Correo electrónico"
            //helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="correo"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}