import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BillContext from '../context/bill-context'


const  act_e= [{label:'CULTIVO Y VENTA DE CEREALES'}, {label:'LEGUMBRES Y GRANOS BÁSICOS NO INCLUIDAS EN CANASTA BÁSICA'}, {label:'ELABORACIÓN DE CHOCOLATE'}, {label:'IMPRESIÓN DIGITAL'}];

const  sucursales= [{label:'Sucursal 1'}, {label:'Sucursal 2'}, {label:'Sucursal 3'}, {label:'Sucursal 4'}];

const  doc_options= [{label:'Factura Electrónica'}, {label:'Nota de débito Electrónica'}, {label:'Nota de crédito Electrónica'}, {label:'Tiquete Electrónico'}, {label:'Factura Electrónica de compra'}, {label:'Factura Electrónica de compra'}];


export default function HeaderForm() {
  return (
    <BillContext.Consumer>
      {context => (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Información del sucursal
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
            id="businesstype_combobox"
             options={act_e}
              getOptionLabel={(option) => option.label}
               style={{ width: 250 }}
               renderInput={(params) => <TextField {...params} label="Actividad Económica" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="business_combobox"
              options={sucursales}
                getOptionLabel={(option) => option.label}
                style={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Sucursal" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="id_sucursal"
              name="id_sucursal"
              label="Número de sucursal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="id_caja"
              name="id_caja"
              label="Número de caja"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
              <Autocomplete
              id="document_combobox"
              options={doc_options}
                getOptionLabel={(option) => option.label}
                style={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Tipo de documento" variant="outlined" />}
                
              />
          </Grid> 
        </Grid>
        </React.Fragment>
      )}
    </BillContext.Consumer>
  );
}