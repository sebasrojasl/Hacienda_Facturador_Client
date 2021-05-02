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
import { DataGrid } from '@material-ui/data-grid';
import FormData from "form-data"
import axios from 'axios';


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

  act_paymentType= {'Contado':'01', 'Crédito':'02', 'Consignación':'03', 'Apartado':'04', 'Arrendamiento con opción de compra':'05', 'Arrendamiento en función financiera':'06', 'Cobro a favor de un tercero':'07', 'Servicios prestados al Estado a crédito':'08', 'Pago de servicios prestados al Estado':'09', 'Otros':'09'};
  
  BackendURL = "https://haciendabackend.herokuapp.com"

  constructor(props){
    super(props);
    this.state = {
      steps: ['Sucursal','Emisor', 'Receptor', 'Datos Encabezado' , 'Datos Detalle Factura'],
      activePanel: 0,
      products : [],
      product: {
        id:  '',
        description: '',
        unit: '',
        quantity: '',
        price: '',
      },
      inputValue:'',
      errors: [],
      error: false,
      helperText: '' 
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidationBranch(){
    
  } 

  handleChange(event) {
    if(event.target.value.length > 5){
      this.setState({[event.target.name]:event.target.value});
      //this.setState({helperText:"", error: false});
    }else{
      this.setState({[event.target.name]:event.target.value});
      //this.setState({helperText:"Invalid", error: true});
    }
    
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
  }

  handleSubmit(event) {
    var body = new FormData();
    
    /*Datos emisor*/
      body.append("emitterName", this.state.name_emisor);
      body.append("emitterIDType", this.state.idEmisor_combobox_Value);
      body.append("emitterID", this.state.idnumber);
      body.append("emitterPhone", this.state.phone_emitter);
      body.append("emitterAddressDrescription", this.state.address_emitter);
      body.append("emitterEmail", this.state.email_emisor);

      body.append("emitterProvince", this.state.emitterProvince);
      body.append("emitterCanton", this.state.emitterCanton);
      body.append("emitterDistrict", this.state.emitterDistrict);
      body.append("emitterNeighborhood", this.state.emitterNeighborhood);
      body.append("emitterCountryCode", this.state.emitterCountryCode);
      body.append("emitterBuisnessName", this.state.emitterBusinessName);
    //

    /* Datos receptor */
      body.append("receiverName", this.state.name_receptor);
      body.append("receiverIDType", this.state.idReceptor_combobox_inputValue);
      body.append("receiverID", this.state.idnumber_receptor);
      body.append("receiverEmail", this.state.email_receptor);

      /* Faltan */ 
      body.append("receiverProvince", this.state.receiverProvince);
      body.append("receiverCanton", this.state.receiverCanton);
      body.append("receiverDistrict", this.state.receiverDistrict);
      body.append("receiverNeighborhood", this.state.receiverNeighborhood);
      body.append("receiverCountryCode", this.state.receiverCountryCode);
      body.append("receiverPhone", this.state.receiverPhone);
    //

    /* Datos para consecutivo */
      body.append("terminal", this.state.id_caja);
      body.append("subsidiary", this.state.id_sucursal);
    //

    /* Datos para factura*/
      body.append("sellCondition", );
      body.append("creditTerm", this.state.id_credit_time);
      body.append("payMethod", this.state.payMethod_combobox_inputValue);
      body.append("currencyCode", this.state.currencyType_combobox_inputValue);
      body.append("exchangeRate", this.state.currency);
      //body.append("", this.state.);
      //body.append("", this.state.);
      //body.append("", this.state.);

    axios({
      method: "post",
      url: this.BackendURL,
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    event.preventDefault();
  }

  handleNewLine = () => { 
    const {product, products, inputValue} = this.state;
    //this.props.onCreate(product);
    product.unit = inputValue;
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
      },
      inputValue: ''
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
  const {product: {id, description, quantity, price}, steps, products, inputValue} = this.state;
  const  act_e= [{label:'CULTIVO Y VENTA DE CEREALES'}, {label:'LEGUMBRES Y GRANOS BÁSICOS NO INCLUIDAS EN CANASTA BÁSICA'}, {label:'ELABORACIÓN DE CHOCOLATE'}, {label:'IMPRESIÓN DIGITAL'}];
  const  sucursales= [{label:'Sucursal 1'}, {label:'Sucursal 2'}, {label:'Sucursal 3'}, {label:'Sucursal 4'}];
  const  doc_options= [{label:'Factura Electrónica'}, {label:'Nota de débito Electrónica'}, {label:'Nota de crédito Electrónica'}, {label:'Tiquete Electrónico'}, {label:'Factura Electrónica de compra'}, {label:'Factura Electrónica de compra'}];
  const  act_emisor= [{label:'Juridica Nacional'}, {label:'Físico Nacional'}, {label:'DIDI'}, {label:'NITE'}, {label:'Pasaporte'}, {label:'DIMEX'}];
  const  act_rec= [{label:'DIMEX'}, {label:'NITE'}, {label:'DIDI'}, {label:'Físico Nacional'}, {label:'Pasaporte'}, {label:'Juridica Nacional'}];  
  const  act_paymentType= [{label:'Contado', value: '01'}, {label:'Crédito', value: '02'}, {label:'Consignación', value: '03'}, {label:'Apartado', value: '04'},  {label:'Arrendamiento con opción de compra', value: '05'},  {label:'Arrendamiento en función financiera', value: '06'},  {label: 'Cobro a favor de un tercero'}, {label:'Servicios prestados al Estado a crédito', value: '08'}, {label:'Pago de servicios prestados al Estado', value: '09'}, {label:'Otros', value: '99'}];
  const  currency= [{label:'CRC-Colón Costarricense'}, {label:'USD-Dolár Americano'}];
  const  paymentMethod= [{label:'Efectivo'}, {label:'Tarjeta'}, {label:'Transferencia - depósito bancario'}, {label:'Recaudado por terceros'}, {label:'Otros'}];
  const  unitOfMeasure = [{label:'unidad'}, {label:'hora'}, {label:'día'}, {label:'minuto'}, {label:'g-gramo'}];
  const  rowsProduct = ['Código', 'Descripción','Unidad', 'Cantidad' , 'Precio']

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
                          helperText ={this.state.helperText}
                          value = {this.state.id_sucursal}
                          onInput = {this.handleChange}
                          error ={this.state.error }  //this.state.id_sucursal.length === 0 ? false : true 
                          id="id_sucursal"
                          name="id_sucursal"
                          label="Número de sucursal"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          helperText ={this.state.helperText}
                          required
                          value = {this.state.id_caja}
                          error = {this.state.error}
                          id="id_caja"
                          name="id_caja"
                          label="Número de caja"
                          fullWidth
                          onInput = {this.handleChange}

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
                            onInput = {this.handleChange}
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
                            onInput = {this.handleChange}
                            name="email_emisor"
                            label="Correo electrónico"
                            fullWidth
                            autoComplete="email"
                          /> 
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="phone_emitter" label="Teléfono" fullWidth autoComplete="phone" value = {this.state.phone_emitter} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="address_emitter" label="Dirección" fullWidth autoComplete="address" value = {this.state.address_emitter} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="emitterProvince" label="Provincia" fullWidth autoComplete="province" value = {this.state.emitterProvince} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="emitterCanton" label="Cantón" fullWidth autoComplete="canton" value = {this.state.emitterCanton} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField required name="emitterDistrict" label="Distrito" fullWidth autoComplete="district" value = {this.state.emitterDistrict} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField name="emitterNeighborhood" label="Barrio" fullWidth autoComplete="neighborhood" value = {this.state.emitterNeighborhood} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField name="emitterCountryCode" label="Código de país" fullWidth autoComplete="code" value = {this.state.emitterCountryCode} onInput = {this.handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField name="emitterBusinessName" label="Nombre del negocio" fullWidth autoComplete="bussines_name" value = {this.state.emitterBusinessName} onChange = {this.handleChange} />
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
                              onInput = {this.handleChange}
                              name="idnumber_receptor"
                              label="Número de identificación"
                              fullWidth
                              autoComplete="Número de identificación"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField required name="name_receptor" label="Nombre" fullWidth autoComplete="name" value = {this.state.name_receptor}
                              onInput = {this.handleChange} />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              required
                              name="email_receptor"
                              label="Correo electrónico"
                              value = {this.state.email_receptor}
                              onInput = {this.handleChange} 
                              fullWidth
                              autoComplete="correo"
                            />
                          </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField required name="receiverProvince" label="Provincia" fullWidth autoComplete="province" value = {this.state.receiverProvince} onInput = {this.handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField required name="receiverCanton" label="Cantón" fullWidth autoComplete="canton" value = {this.state.receiverCanton} onInput = {this.handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField required name="receiverDistrict" label="Distrito" fullWidth autoComplete="district" value = {this.state.receiverDistrict} onInput = {this.handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField name="receiverNeighborhood" label="Barrio" fullWidth autoComplete="neighborhood" value = {this.state.receiverNeighborhood} onInput = {this.handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField name="receiverCountryCode" label="Código de país" fullWidth autoComplete="code" value = {this.state.receiverCountryCode} onInput = {this.handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField name="receiverPhone" label="Número de teléfono" fullWidth autoComplete="phone" value = {this.state.receiverPhone} onInput = {this.handleChange} />
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
                            onInput = {this.handleChange}
                            name="id_credit_time"
                            label="Plazo de crédito"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            value = {this.state.id_exchangeType}
                            onInput = {this.handleChange}
                            name="id_exchangeType"
                            label="Tipo de cambio"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            value = {this.state.id_saleCondition}
                            onInput = {this.handleChange}
                            name="id_saleCondition"
                            label="Detalle de condición de venta"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            value = {this.state.id_exchangeTypeDetail}
                            onInput = {this.handleChange}
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
                          inputProps={{ maxLength: 12 }}
                          onInput = {this.handleNewProduct('id')}
                          style={{ margin: 8 }}
                          margin="normal"
                          fullWidth

                        />
                        <TextField
                          required
                          label="Descripción"
                          value = {description}
                          onInput = {this.handleNewProduct('description')}
                          style={{ margin: 10 }}
                          fullWidth
                          margin="normal"
                      
                        />
                      <Autocomplete
                        required
                        id="idtype_combobox"
                        value = {this.state.valueComboBox}
                        inputValue = {inputValue}
                        onChange={( _, newValue) => {    
                          this.handleComboBoxChange('valueComboBox', newValue)
                        }}
                        onInputChange={( _, newValue) => {    
                          this.handleComboBoxChange('inputValue', newValue)
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
                          onInput = {this.handleNewProduct('quantity')}
                          style={{ margin: 10 }}
                          fullWidth
                          margin="normal"
                      
                        />      

                        <TextField
                          required
                          id="priceProduct"
                          label="Precio Unitario"
                          value = {price}
                          onInput = {this.handleNewProduct('price')}
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
                       <DataGrid rows={rowsProduct} columns={this.state.products} pageSize={5} checkboxSelection />
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
                
                <Button
                  variant="contained"
                  color="primary"
                  
                  className={classes.button}
                >
                  Cargar p12
                </Button>
                <TextField
                  required
                  label="Pin"
                  style={{ margin: 8 }}
                  margin="normal"
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  className={classes.button}
                >
                  Firmar y enviar factura
                </Button>

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
