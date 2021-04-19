import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const  act_e= [{label:'Contado'}, {label:'Crédito'}, {label:'Consignación'}, {label:'Apartado'},  {label:'Arrendamiento con opción de compra'},  {label:'Arrendamiento en función financiera'},  {label:'Servicios prestados al Estado a crédito'}, {label:'Pago de servicios prestados al Estado'}, {label:'Otro'}];

const  sucursales= [{label:'CRC-Colón Costarricense'}, {label:'USD-Dolár Americano'}];

const  doc_options= [{label:'Efectivo'}, {label:'Tarjeta'}, {label:'Transferencia - depósito bancario'}, {label:'Recaudado por terceros'}, {label:'Otros'}];


export default function Bill() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de pago
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
          id="businesstype_combobox"
           options={act_e}
            getOptionLabel={(option) => option.label}
             style={{ width: 250 }}
             renderInput={(params) => <TextField {...params} label="Codición de venta" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="business_combobox"
            options={sucursales}
              getOptionLabel={(option) => option.label}
              style={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Moneda de venta" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_credit"
            name="id_credit"
            label="Plazo de crédito"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_exchangeType"
            name="id_exchangeType"
            label="Tipo de cambio"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_saleCondition"
            name="id_saleCondition"
            label="Detalle de condición de venta"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_exchangeTypeDetail"
            name="id_exchangeTypeDetail"
            label="Detalle de forma de cambio"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
            <Autocomplete
            id="payMethod"
            options={doc_options}
              getOptionLabel={(option) => option.label}
              style={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Forma de pago" variant="outlined" />}
              
            />
        </Grid> 
      </Grid>

    </React.Fragment>
  );
}