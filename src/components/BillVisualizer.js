import React ,{ Component } from "react";
import { withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, Fecha, Emisor, Receptor, IVA, Total) {
  return {
    name,
    Fecha,
    Emisor,
    Receptor,
    IVA,
    Total,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{width:5, marginLeft:8}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center" style={{width:3}}>{row.Fecha}</TableCell>
        <TableCell align="center">{row.Emisor}</TableCell>
        <TableCell align="center">{row.Receptor}</TableCell>
        <TableCell align="center">{row.IVA}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Total Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        {Math.round(historyRow.amount * row.Total * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Fecha: PropTypes.number.isRequired,
    Receptor: PropTypes.number.isRequired,
    Emisor: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    Total: PropTypes.number.isRequired,
    IVA: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];


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
          Total: '',
        },
        inputValue:'',
        errors: [],
        error: false,
        helperText: '' 
        
      }
    }
  
    handleValidationBranch(){
      
    } 
  
    handleSubmit(event) {
      var body = new FormData();
  
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

  
  
    render() {
    const classes = this.props.classes;


  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Visualizador de facturas
        </Typography>
      </Toolbar>
    </AppBar>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <React.Fragment>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell width='15'>Fecha</TableCell>
                        <TableCell align="center">Emisor</TableCell>
                        <TableCell align="center">Receptor</TableCell>
                        <TableCell align="center">IVA</TableCell>
                        <TableCell align="center">Total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
  }
};



export default withStyles(useStyles)(BillVisualizer);
