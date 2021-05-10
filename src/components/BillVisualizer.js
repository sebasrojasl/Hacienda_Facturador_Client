import React ,{ Component } from "react";
import { withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import FormData from "form-data"
import axios from 'axios';


const useStyles = (theme) => ({
  root: {
    color: '#784af4',
  },

  appBar: {
    position: 'relative',
    background: 'linear-gradient(45deg, #283593 90%, #1de9b6 30%)',
    border: 0,
    color: 'white',
    height: 70,
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
      transitionDuration: "0.3s",
    },
    
  }
});

class BillVisualizer extends Component {

  act_paymentType= {'Contado':'01', 'Crédito':'02', 'Consignación':'03', 'Apartado':'04', 'Arrendamiento con opción de compra':'05', 'Arrendamiento en función financiera':'06', 'Cobro a favor de un tercero':'07', 'Servicios prestados al Estado a crédito':'08', 'Pago de servicios prestados al Estado':'09', 'Otros':'09'};
  
  BackendURL = "https://haciendabackend.herokuapp.com"

  constructor(props){
    super(props);
    this.state = {
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
  const {product: {id, description, quantity, price}, inputValue} = this.state;

  //const  rowsProduct = ['id', 'description','unit', 'quantity' , 'price'];


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


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
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>         
        </Paper>
      </main>
    </React.Fragment>
  );
  }
}



export default withStyles(useStyles)(BillVisualizer);
