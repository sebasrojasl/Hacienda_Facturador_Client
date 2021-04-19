import React ,{ Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import StepContent from '@material-ui/core/StepContent';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#784af4',
  },

  appBar: {
    position: 'relative',
    background: 'linear-gradient(45deg, #283593 90%, #1de9b6 30%)',
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  hover: {
    borderRadius: "5px",
    cursor:"pointer",
    transitionDuration: "0.3s",
    '&:hover': {
      background: "#e8eaf6",
      padding: theme.spacing(0.5,0,0.5),
      transitionDuration: "0.3s",
    },
    
  }
}));

class Bill extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      steps: ['Sucursal','Emisor', 'Receptor', 'Datos Encabezado' , 'Datos Detalle Factura', 'Documentos de referencia y otros'],
      activePanel: 0,
      products : [],
      product: {
        id:  '',
        description: '',
        unit: '',
        quantity: '',
        price: '',

      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]:event.target.value});
  }

  handleNewProduct = name => ({target:{value}}) => {
    this.setState({
      product: {
        ...this.state.product,
        [name] : value
      }
    })
  }

  handleComboBoxChange(event, value) {
    this.setState({[event]:value});
    console.log(event, value);
  }

  handleSubmit(event) {
    alert('Factura generada');
    event.preventDefault();
  }

  handleNewLine = () => {
    const {product, products} = this.state;
    //this.props.onCreate(product);
    this.setState({
      products:[
        ...products,
        product
      ]
    }) 

    this.setState({
      product: {
        id:  '',
        description: '',
        unit: '',
        quantity: '',
        price: '',
      }
    })

  }

  swapFormActive = (param) => () => {
    this.setState({
      activePanel: param
    });
  }

  handleNext = () => {
    const { activePanel } = this.state;
    this.setState({
      activePanel: activePanel + 1
    });
  };

  handleBack = () => {
    const { activePanel } = this.state;
    this.setState({
      activePanel: activePanel - 1
    });
  };
  render() {
  const classes = this.props.classes;
  const {product: {id, description, unit, quantity, price}, steps, products} = this.state;
  const  act_e= [{label:'CULTIVO Y VENTA DE CEREALES'}, {label:'LEGUMBRES Y GRANOS BÁSICOS NO INCLUIDAS EN CANASTA BÁSICA'}, {label:'ELABORACIÓN DE CHOCOLATE'}, {label:'IMPRESIÓN DIGITAL'}];
  const  sucursales= [{label:'Sucursal 1'}, {label:'Sucursal 2'}, {label:'Sucursal 3'}, {label:'Sucursal 4'}];
  const  doc_options= [{label:'Factura Electrónica'}, {label:'Nota de débito Electrónica'}, {label:'Nota de crédito Electrónica'}, {label:'Tiquete Electrónico'}, {label:'Factura Electrónica de compra'}, {label:'Factura Electrónica de compra'}];
  const  act_emisor= [{label:'Juridica Nacional'}, {label:'Físico Nacional'}, {label:'DIDI'}, {label:'NITE'}, {label:'Pasaporte'}, {label:'DIMEX'}];
  const  act_rec= [{label:'DIMEX'}, {label:'NITE'}, {label:'DIDI'}, {label:'Físico Nacional'}, {label:'Pasaporte'}, {label:'Juridica Nacional'}];
  //const  act_v= [{label:'Código vendedor'}, {label:'Código comprador'}, {label:'Assignado por la industria'}, {label:'Uso interno'} , {label:'Otros'}];
  const  act_paymentType= [{label:'Contado'}, {label:'Crédito'}, {label:'Consignación'}, {label:'Apartado'},  {label:'Arrendamiento con opción de compra'},  {label:'Arrendamiento en función financiera'},  {label:'Servicios prestados al Estado a crédito'}, {label:'Pago de servicios prestados al Estado'}, {label:'Otro'}];
  const  currency= [{label:'CRC-Colón Costarricense'}, {label:'USD-Dolár Americano'}];
  const  paymentMethod= [{label:'Efectivo'}, {label:'Tarjeta'}, {label:'Transferencia - depósito bancario'}, {label:'Recaudado por terceros'}, {label:'Otros'}];
  const  unitOfMeasure = [{label:'unidad'}, {label:'hora'}, {label:'día'}, {label:'minuto'}, {label:'g-gramo'}]
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Facturador Hacienda
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          Emisión de comprobante electrónico
          </Typography>
          <Stepper activeStep={this.state.activePanel} nonLinear className={classes.stepper} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={this.swapFormActive(index)} className={classes.hover} >{label}</StepButton>
                <StepContent>
                  {this.state.activePanel === 0 && (
                   <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                      Información del sucursal
                    </Typography>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                        name="businesstype_combobox"
                        options={act_e}
                        value = {this.state.businesstype_Value}
                        inputValue = {this.state.businesstype_inputValue}
                        onChange={( _, newValue) => {    
                          this.handleComboBoxChange("businesstype_Value", newValue);
                        }}
                        onInputChange={( _, newInputValue) => {    
                          this.handleComboBoxChange("businesstype_inputValue", newInputValue);
                        }}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label="Actividad Económica" variant="outlined" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          id="business_combobox"
                          options={sucursales}
                          value = {this.state.business_combobox_Value}
                          inputValue = {this.state.business_combobox_inputValue}
                          onChange={( _, newValue) => {    
                            this.handleComboBoxChange("business_combobox_Value", newValue);
                          }}
                          onInputChange={( _, newInputValue) => {    
                            this.handleComboBoxChange("business_combobox_inputValue", newInputValue);
                          }}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Sucursal" variant="outlined" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          value = {this.state.id_sucursal}
                          onChange = {this.handleChange}
                          id="id_sucursal"
                          name="id_sucursal"
                          label="Número de sucursal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          value = {this.state.id_caja}
                          id="id_caja"
                          name="id_caja"
                          label="Número de caja"
                          fullWidth
                          onChange = {this.handleChange}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Autocomplete
                          id="document_combobox"
                          
                          options={doc_options}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Tipo de documento" variant="outlined" />}
                            value = {this.state.document_combobox_Value}
                            inputValue = {this.state.document_combobox_inputValue}
                            onChange={( _, newValue) => {    
                              this.handleComboBoxChange("document_combobox_Value", newValue);
                            }}
                            onInputChange={( _, newInputValue) => {    
                              this.handleComboBoxChange("document_combobox_inputValue", newInputValue);
                            }}
                          />
                      </Grid> 
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Siguiente
                    </Button>
                  </React.Fragment>
                  )}
                   {this.state.activePanel === 1 && (
                      <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Datos del emisor
                      </Typography>
                      <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                          <Autocomplete
                          id="idEmisor_combobox"
                          options={act_emisor}
                          value = {this.state.idEmisor_combobox_Value}
                          inputValue = {this.state.idEmisor_combobox_inputValue}
                          onChange={( _, newValue) => {    
                            this.handleComboBoxChange("idEmisor_combobox_Value", newValue);
                          }}
                          onInputChange={( _, newInputValue) => {    
                            this.handleComboBoxChange("idEmisor_combobox_inputValue", newInputValue);
                          }}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 250 }}
                            renderInput={(params) => <TextField {...params} label="Tipo de Identificación" variant="outlined" />}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            value = {this.state.idnumber}
                            name="idnumber"
                            label="Número de identificación"
                            onChange = {this.handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="name_emisor" label="Nombre" fullWidth autoComplete="name" value = {this.state.name_emisor} onChange = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            value = {this.state.email_emisor}
                            onChange = {this.handleChange}
                            name="email_emisor"
                            label="Correo electrónico"
                            fullWidth
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="phone_receptor" label="Teléfono" fullWidth autoComplete="phone" value = {this.state.phone_receptor} onChange = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="address_receptor" label="Dirección" fullWidth autoComplete="address" value = {this.state.address_receptor} onChange = {this.handleChange} />
                        </Grid>
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                          Siguiente
                        </Button>
                      </React.Fragment>
                   )}
                    {this.state.activePanel === 2 && (
                      <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                          Datos del receptor
                        </Typography>
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                            id="idReceptor_combobox"
                              options={act_rec}
                              value = {this.state.idReceptor_combobox_Value}
                              inputValue = {this.state.idReceptor_combobox_inputValue}
                              onChange={( _, newValue) => {    
                                this.handleComboBoxChange("idReceptor_combobox_Value", newValue);
                              }}
                              onInputChange={( _, newInputValue) => {    
                                this.handleComboBoxChange("idReceptor_combobox_inputValue", newInputValue);
                              }}
                              getOptionLabel={(option) => option.label}
                              style={{ width: 250 }}
                              renderInput={(params) => <TextField {...params} label="Tipo de Identificación" variant="outlined" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              required
                              value = {this.state.idnumber_receptor}
                              onChange = {this.handleChange}
                              name="idnumber_receptor"
                              label="Número de identificación"
                              fullWidth
                              autoComplete="Número de identificación"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField required name="name_receptor" label="Nombre" fullWidth autoComplete="name" value = {this.state.name_receptor}
                              onChange = {this.handleChange} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              required
                              name="email_receptor"
                              label="Correo electrónico"
                              value = {this.state.email_receptor}
                              onChange = {this.handleChange} 
                              fullWidth
                              autoComplete="correo"
                            />
                          </Grid>
                        </Grid>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                          Siguiente
                        </Button>
                      </React.Fragment> 
                    )}
                    {this.state.activePanel === 3 && (
                      <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Datos de pago
                      </Typography>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                          id="paymethodType_combobox"
                          value = {this.state.paymethodType_combobox_Value}
                          inputValue = {this.state.paymethodType_combobox_inputValue}
                          onChange={( _, newValue) => {    
                            this.handleComboBoxChange("paymethodType_combobox_Value", newValue);
                          }}
                          onInputChange={( _, newInputValue) => {    
                            this.handleComboBoxChange("paymethodType_combobox_inputValue", newInputValue);
                          }}
                           options={act_paymentType}
                            getOptionLabel={(option) => option.label}
                             style={{ width: 250 }}
                             renderInput={(params) => <TextField {...params} label="Codición de venta" variant="outlined" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            id="currencyType_combobox"
                            value = {this.state.currencyType_combobox_Value}
                            inputValue = {this.state.currencyType_combobox_inputValue}
                            onChange={( _, newValue) => {    
                              this.handleComboBoxChange("currencyType_combobox_Value", newValue);
                            }}
                            onInputChange={( _, newInputValue) => {    
                              this.handleComboBoxChange("currencyType_combobox_inputValue", newInputValue);
                            }}
                            options={currency}
                              getOptionLabel={(option) => option.label}
                              style={{ width: 250 }}
                              renderInput={(params) => <TextField {...params} label="Moneda de venta" variant="outlined" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value = {this.state.id_credit_time}
                            onChange = {this.handleChange}
                            name="id_credit_time"
                            label="Plazo de crédito"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            value = {this.state.id_exchangeType}
                            onChange = {this.handleChange}
                            name="id_exchangeType"
                            label="Tipo de cambio"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value = {this.state.id_saleCondition}
                            onChange = {this.handleChange}
                            name="id_saleCondition"
                            label="Detalle de condición de venta"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            value = {this.state.id_exchangeTypeDetail}
                            onChange = {this.handleChange}
                            name="id_exchangeTypeDetail"
                            label="Detalle de forma de cambio"
                            fullWidth
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                            name="payMethod"
                            value = {this.state.payMethod_combobox_Value}
                            inputValue = {this.state.payMethod_combobox_inputValue}
                            onChange={( _, newValue) => {    
                              this.handleComboBoxChange("payMethod_combobox_Value", newValue);
                            }}
                            onInputChange={( _, newInputValue) => {    
                              this.handleComboBoxChange("payMethod_combobox_inputValue", newInputValue);
                            }}
                            options={paymentMethod}
                              getOptionLabel={(option) => option.label}
                              style={{ width: 400 }}
                              renderInput={(params) => <TextField {...params} label="Forma de pago" variant="outlined" />}
                              
                            />
                        </Grid> 
                        </Grid>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                          Siguiente
                        </Button>
                      </React.Fragment>
                    )}
                    {this.state.activePanel === 4 && (
                     <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                          Ingreso de Productos
                        </Typography>
                     <Grid container spacing={3}>
                     <Grid item xs={6} spacing={3}>
                       
                        <TextField
                          required
                          label="Código"
                          value = {id}
                          onChange = {this.handleNewProduct('id')}
                          style={{ margin: 8 }}
                          margin="normal"
                          fullWidth

                        />
                        <TextField
                          required
                          label="Descripción"
                          value = {description}
                          onChange = {this.handleNewProduct('description')}
                          style={{ margin: 10 }}
                          fullWidth
                          margin="normal"
                      
                        />
                      <Autocomplete
                        required
                        id="idtype_combobox"
                        value = {unit}
                        inputValue = {this.state.idtype_combobox_inputValue}
                        onChange={( _, newValue) => {    
                          this.handleComboBoxChange("document_combobox_Value", newValue);
                        }}
                        onInputChange={( _, newInputValue) => {    
                            this.handleComboBoxChange("idtype_combobox_inputValue", newInputValue);
                        }}
                        options={unitOfMeasure}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label="Unidad de medida" variant="outlined" />}
                      />

                        <TextField
                          required
                          label="Cantidad"
                          value = {quantity}
                          onChange = {this.handleNewProduct('quantity')}
                          style={{ margin: 10 }}
                          fullWidth
                          margin="normal"
                      
                        />      

                        <TextField
                          required
                          id="priceProduct"
                          label="Precio Unitario"
                          value = {price}
                          onChange = {this.handleNewProduct('price')}
                          style={{ margin: 10 }}
                          fullWidth
                          margin="normal"
                      
                        />

                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick = {this.handleNewLine}
                        >
                        Agregar línea
                      </Button> 
                     </Grid>
                     <Grid item xs={6}>
                       <Paper className = {this.paper}>
                       <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Código</TableCell>
                              <TableCell>Descripción</TableCell>
                              <TableCell >Unidad</TableCell>
                              <TableCell >Cantidad</TableCell>
                              <TableCell >Precio</TableCell>
                            </TableRow>
                          </TableHead>
                        <TableBody>
                            {products.map(({id, description, unit, quantity, price}) => (
                              <TableRow key={id}>
                                <TableCell component="th" scope="row">
                                        {id}
                                </TableCell>
                                <TableCell >{description}</TableCell>
                                <TableCell >{unit}</TableCell>
                                <TableCell >{quantity}</TableCell>
                                <TableCell >{price}</TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                       </Paper> 
                     </Grid>
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                          Siguiente
                        </Button>
                      
                     </Grid>
                     </React.Fragment>
                    )}
                    {this.state.activePanel === 5 &&(
                      <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Documentos de referencia
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Otros
                      </Typography>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Atrás
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                          Siguiente
                        </Button>
                      </React.Fragment>
                    )} 
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {this.state.activePanel === steps.length &&  (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Resumen
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleBack}
                  className={classes.button}
                  >
                  Atrás
                </Button>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
  }
}


export default () => {

  const classes = useStyles();
  return <Bill classes={classes} />;
}
