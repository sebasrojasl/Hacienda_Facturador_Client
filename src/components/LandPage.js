import React, { Component } from 'react';
import AppContext from '../context/AppContext';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = (theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
  },
  contentImage: {
    display: 'flex', 
    justifyContent: 'center'

  },
  image: {
    width: '200px',
    heigth: '200px',
    padding: 'auto',
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
});

const menus = [
    {
      title: 'Consultar facturas',
      buttonText: 'Consultar',
      buttonVariant: 'outlined',
      image: 'https://www.flaticon.com/svg/vstatic/svg/1091/1091169.svg?token=exp=1620961637~hmac=10770e8c1018675edc451bc9697baa30'

    },
    {
      title: 'Generar nueva factura',
      price: '15',
      buttonText: 'Facturar',
      buttonVariant: 'outlined',
      image: 'https://www.flaticon.com/svg/vstatic/svg/1090/1090923.svg?token=exp=1620961635~hmac=94db4781c9d29eb2d1a776e47c370203'

    },
    {
        title: 'Declarar IVA',
        buttonText: 'Declarar',
        buttonVariant: 'outlined',
        image: 'https://www.flaticon.com/svg/vstatic/svg/1091/1091001.svg?token=exp=1620961941~hmac=d41291ef6fcaafa3f79cfe9aa39c0113'
  
      },
  ];

class LandPage extends Component{
    static contextType = AppContext;
    
    render(){
        const classes = this.props.classes;
        return(
            <div>
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Sistema de facturación electrónica
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Administre sus facturas electrónicas desde la comodidad de su hogar. El sistema le permite visualizar sus facturas creadas anteriormente y generar nuevas facturas.
                    </Typography>
                </Container>
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                    {menus.map((menu) => (
                        <Grid item key={menu.title} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                            align='center'
                            title={menu.title}
                            className={classes.cardHeader}
                            />
                            <CardContent className={classes.contentImage}>
                                <img src={menu.image} className={classes.image} alt='icon'></img>
                            </CardContent>
                            <CardActions>
                            <Button fullWidth variant={menu.buttonVariant} color="primary">
                                {menu.buttonText}
                            </Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Container>
            
            </div>
        );
    }
}
export default withStyles(useStyles)(LandPage)